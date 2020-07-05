import { XSLTSchema, SimpleType, ComplexType, AttributeItem, SchemaData} from './xsltschema';
import { DocumentTypes } from './xslLexer';

export class Expected {
    elements: string[] = [];
    attrs: string[] = [];
    attributeValues: string[] = [];
    foundAttributes: string[] = [];
}

export class SchemaQuery {

    private schema: SchemaData;
    public soughtAttributes: string[] = [];
    public emptyElements: string[] = [];
    public docType: DocumentTypes;

    constructor (schemaData: SchemaData) {
        this.schema = schemaData;
        this.docType = schemaData.docType;
        switch (schemaData.docType) {
            case DocumentTypes.XSLT:
                this.soughtAttributes =  ['name', 'as', 'select', 'test', 'href'];
                this.emptyElements = ['xsl:variable','xsl:param','xsl:sequence','xsl:attribute','xsl:output','xsl:apply-templates','xsl:with-param']
                break;
            case DocumentTypes.DCP:
                this.soughtAttributes =  ['name', 'defaultValue', 'literalValue','version','id','description', 'path'];
                break;
            default:
                break;
        }
    }


    public getExpected(name: string, attributeName?: string) {
        let result: Expected = new Expected();
        if (this.schema.docType === DocumentTypes.XSLT && !name.startsWith('xsl:')) {
            let attGroup = this.schema.attributeGroups['xsl:literal-result-element-attributes'];
            if (attGroup.attrs) {
                this.mergeAttrArrays(result, Object.keys(attGroup.attrs));
                if (attributeName) {
                    let simpleTypeName = attGroup.attrs[attributeName];
                    if (simpleTypeName) {
                        let sType = this.schema.simpleTypes[simpleTypeName];
                        if (sType) {
                            this.lookupSimpleType(sType, result);
                        }
                    }
                }
            }
            return result;
        }
        name = name === 'xsl:stylesheet'? 'xsl:transform': name;
        let ct = <ComplexType>this.schema.elements[name];
        if (ct) {
            if (ct.elementNames) {
                result.elements = ct.elementNames;
            }
            this.collectAttributeDetails(ct, result, attributeName);
            let typeName: string|undefined = ct.type? ct.type: ct.base;
            if (typeName) {
                let type = <ComplexType>this.schema.complexTypes[typeName];
                if (type) {
                    if (type.elementNames) {
                        this.mergeArrays(result.elements, type.elementNames);
                    }
                    if (type.base) {
                        this.lookupBaseType(type, result, attributeName);
                    }
                    if (type.attrs) {
                        this.mergeAttrArrays(result, Object.keys(type.attrs));
                        if (attributeName) {
                            let attrTypeName = type.attrs[attributeName];
                            if (attrTypeName) {
                                if (attrTypeName === 'xs:boolean') {
                                    this.mergeArrays(result.attributeValues, ['true', 'false']);
                                } else {
                                    let attrType = this.schema.simpleTypes[attrTypeName];
                                    if (attrType) {
                                        this.lookupSimpleType(attrType, result);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!ct && this.schema.substitutionGroups) {
            let isInstructionSg = true;
            let sgElement = <ComplexType>this.schema.substitutionGroups.instruction.elements[name];
            if (!sgElement) {
                isInstructionSg = false;
                sgElement = <ComplexType>this.schema.substitutionGroups.declaration.elements[name];
            }
            if (sgElement) {
                this.collectAttributeDetails(sgElement, result, attributeName);
                this.lookupBaseType(sgElement, result, attributeName);
                let sgType: ComplexType;
                if (isInstructionSg) {
                    sgType = this.schema.complexTypes['xsl:versioned-element-type'];
                } else {
                    sgType = this.schema.complexTypes['xsl:generic-element-type'];
                }
                if (sgType && sgType.base) {
                    this.lookupBaseType(sgType, result, attributeName);
                }
                if (sgType && sgType.attrs) {
                    this.mergeAttrArrays(result, Object.keys(sgType.attrs));
                }
                if (sgElement.elementNames) {
                    this.mergeArrays(result.elements, sgElement.elementNames);
                }
            } else {
                // literal result element - provide 'xsl:literal-result-element-attributes' attributeGoup?
            }
        }
        if (this.docType === DocumentTypes.XSLT) {
            result.elements = this.performSubstitutions(result.elements);
        } else if (this.docType === DocumentTypes.DCP) {
            // parameterRefGroup applies to all elements permitting literalValue attr
            if (result.attrs.indexOf('literalValue') !== -1) {
                result.attrs.push('xpath');
                result.attrs.push('parameterRef');
            }
        }
        return result;
    }

    private collectAttributeDetails(ct: ComplexType, result: Expected, attributeName: string|undefined) {
        if (ct.attrs) {
            this.mergeAttrArrays(result, Object.keys(ct.attrs));
            if (attributeName) {
                let simpleTypeName = ct.attrs[attributeName];
                if (simpleTypeName) {
                    if (simpleTypeName === 'xs:boolean') {
                        this.mergeArrays(result.attributeValues, ['true', 'false']);
                    } else {
                        let sType = this.schema.simpleTypes[simpleTypeName];
                        if (sType) {
                            this.lookupSimpleType(sType, result);
                        }
                    }
                }
            }
        }
        if (ct.attributeList) {
            let attNames: string[] = [];
            let findAtt = attributeName ? true : false;

            ct.attributeList.forEach((item) => {
                attNames.push(item.name);
                if (findAtt && item.name === attributeName) {
                    findAtt = false;
                    if (item.enum) {
                        this.mergeArrays(result.attributeValues, item.enum);
                    }
                }
            });
            this.mergeAttrArrays(result, attNames);
        }
    }

    private lookupBaseType(sgType: ComplexType, result: Expected, attributeName?: string) {
        let sgTypeBase = sgType.base? sgType.base: sgType.type;
        if (sgTypeBase) {
            let baseType = <ComplexType>this.schema.complexTypes[sgTypeBase];
            if (baseType && baseType.attrs) {
                this.mergeAttrArrays(result, Object.keys(baseType.attrs));
                if (attributeName) {
                    let attrType = baseType.attrs[attributeName];
                    if (attrType) {
                        let simpleType = <SimpleType>this.schema.simpleTypes[attrType];
                        if (simpleType.enum) {
                            this.mergeArrays(result.attributeValues, simpleType.enum);
                        }
                    }
                }
            }
            if (baseType && baseType.elementNames) {
                this.mergeArrays(result.elements, baseType.elementNames);
            }
            // recursive call;
            if (baseType.base) {
                this.lookupBaseType(baseType, result, attributeName);
            }
        }
    }

    private lookupSimpleType(sgType: SimpleType, result: Expected) {
        if (sgType.enum) {
            this.mergeArrays(result.attributeValues, sgType.enum);
        }
        // all simpleTypes here are restrictions on a base we should NOT make this recursive call;
        // if (sgType.base) {
        //     sgType.base.forEach((item) => {
        //         let baseType = <SimpleType>this.schema.simpleTypes[item];
        //         if (baseType) {
        //             this.lookupSimpleType(baseType, result);
        //         }
        //     });
        // }
    }

    private mergeArrays(target: string[], source: string[]) {
        source.forEach((item) => {
            if (target.indexOf(item) === -1) {
                target.push(item);
            }
        });
        return target;
    }

    private mergeAttrArrays(expected: Expected, source: string[]) {
        let target = expected.attrs;
        source.forEach((item) => {
            if (target.indexOf(item) === -1) {
                if (this.soughtAttributes.indexOf(item) > -1) {
                    expected.foundAttributes.push(item)
                }
                target.push(item);
            }
        });
        return target;
    }

    private performSubstitutions(elements: string[]) {
        let newElements: string[] = [];

        elements.forEach((item) => {
            if (item === 'xsl:instruction' && this.schema.substitutionGroups) {
                let subElements = Object.keys(this.schema.substitutionGroups.instruction.elements);
                newElements.push('xsl:literal-result-element');
                newElements = newElements.concat(subElements);
            } else if (item === 'xsl:declaration' && this.schema.substitutionGroups) {
                let subElements = Object.keys(this.schema.substitutionGroups.declaration.elements);
                newElements = newElements.concat(subElements);
            } else {
                newElements.push(item);
            }
        });
    
        return newElements;
    }
}

