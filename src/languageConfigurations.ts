import {LanguageConfiguration, DocumentTypes} from './xslLexer';

export class XSLTConfiguration {
	// Note: Non-standard 'else', 'then', 'on-duplicates' can be used in Saxon 10.0
	static expressionAtts = ['context-item', 'count', 'else', 'from', 'group-adjacent', 'group-by', 'group-ending-with', 'group-starting-with', 'from', 'for-each-item', 'for-each-source', 'initial-value', 
	'key', 'match', 'namespace-context', 'on-duplicates', 'select', 'test', 'then', 'use', 'use-when', 'value', 'with-params', 'xpath' ];

	static avtAtts = ['allow-duplicate-names', 'base-uri', 'build-tree', 'byte-order-mark', 'case-order', 'cdata-section-elements', 'collation', 'data-type', 'doctype-public', 'doctype-system', 'encoding', 'error-code',
		'escape-uri-attributes', 'flags', 'format', 'grouping-separator', 'grouping-size', 'href', 'html-version', 'include-context-type', 'indent', 'item-separator', 'json-node-output-method',
		'lang', 'letter-value', 'media-type', 'method', 'name', 'namespace', 'normalization-form', 'omit-xml-declaration', 'order', 'ordinal', 'ordinal-type', 'output-version',
		'parameter-document', 'regex', 'separator', 'schema-aware', 'stable', 'standalone', 'suppress-indentaion', 'terminate', 'undeclar-prefixes', 'start-at'];

	static xsltPrefix = 'xsl';

	static configuration: LanguageConfiguration = {
		expressionAtts: XSLTConfiguration.expressionAtts,
		avtAtts: XSLTConfiguration.avtAtts,
		nativePrefix: XSLTConfiguration.xsltPrefix,
		tvtAttributes: ['expand-text'],
		nonNativeAvts: true,
		docType: DocumentTypes.XSLT
	} 
}

export class DCPConfiguration {
	// initial configuration is for basic XProc support only
	public static configuration: LanguageConfiguration = {
		expressionAtts: ['xpath'],
		nativePrefix: '',
		tvtAttributes: [],
		nonNativeAvts: false,
		docType: DocumentTypes.DCP
	} 
}

export class XProcConfiguration {
	// initial configuration is for basic XProc support only
	public static configuration: LanguageConfiguration = {
		expressionAtts: ['select', 'test'],
		nativePrefix: 'p',
		tvtAttributes: ['expand-text', 'inline-expand-text'],
		nonNativeAvts: true,
		docType: DocumentTypes.Other
	} 
}

export class XMLConfiguration {
	// initial configuration is for basic XProc support only
	public static configuration: LanguageConfiguration = {
		expressionAtts: [],
		nativePrefix: 'qz',
		tvtAttributes: [],
		nonNativeAvts: false,
		docType: DocumentTypes.Other
	} 
}

export class XSLTLightConfiguration {
	// used for global instruction processing only
	public static configuration: LanguageConfiguration = {
		expressionAtts: [],
		nativePrefix: 'xsl',
		tvtAttributes: [],
		nonNativeAvts: false,
		docType: DocumentTypes.XSLT
	} 
}