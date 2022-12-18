export enum XSLTnamespaces {
	NotDefined,
	Array,
	ExpathArchive,
	ExpathBinary,
	ExpathFile,
	Exslt,
	ExsltMath,
	ExsltRegex,
	ExsltSets,
	ExsltStrings,
	Map,
	Math,
	Saxon,
	SQL,
	XMLSchema,
	XPath,
	XSLT,
	IXSL
}

interface NamespaceData {

}

export class FunctionData {
	public static readonly xpath = [
		"count#1",
		"QName#2",
		"abs#1",
		"analyze-string#2",
		"analyze-string#3",
		"apply#2",
		"available-environment-variables#0",
		"avg#1",
		"base-uri#0",
		"base-uri#1",
		"boolean#1",
		"ceiling#1",
		"codepoint-equal#2",
		"codepoints-to-string#1",
		"collation-key#1",
		"collation-key#2",
		"collection#0",
		"collection#1",
		"compare#2",
		"compare#3",
		"concat#3",
		"contains#2",
		"contains#3",
		"contains-token#2",
		"contains-token#3",
		"current-date#0",
		"current-dateTime#0",
		"current-time#0",
		"starts-with#2",
		"starts-with#3",
		"static-base-uri#0",
		"string#0",
		"string#1",
		"string-join#1",
		"string-join#2",
		"string-length#0",
		"string-length#1",
		"string-to-codepoints#1",
		"subsequence#2",
		"subsequence#3",
		"substring#2",
		"substring#3",
		"substring-after#2",
		"substring-after#3",
		"substring-before#2",
		"substring-before#3",
		"sum#1",
		"sum#2",
		"data#0",
		"data#1",
		"dateTime#2",
		"day-from-date#1",
		"day-from-dateTime#1",
		"days-from-duration#1",
		"deep-equal#2",
		"deep-equal#3",
		"default-collation#0",
		"default-language#0",
		"distinct-values#1",
		"distinct-values#2",
		"doc#1",
		"doc-available#1",
		"document-uri#0",
		"document-uri#1",
		"element-with-id#1",
		"element-with-id#2",
		"empty#1",
		"encode-for-uri#1",
		"ends-with#2",
		"ends-with#3",
		"environment-variable#1",
		"error#0",
		"error#1",
		"error#2",
		"error#3",
		"escape-html-uri#1",
		"exactly-one#1",
		"exists#1",
		"false#0",
		"filter#2",
		"floor#1",
		"fold-left#3",
		"fold-right#3",
		"for-each#2",
		"for-each-pair#3",
		"format-date#2",
		"format-date#5",
		"format-dateTime#2",
		"format-dateTime#5",
		"format-integer#2",
		"format-integer#3",
		"format-number#2",
		"format-number#3",
		"format-time#2",
		"format-time#5",
		"function-arity#1",
		"function-lookup#2",
		"function-name#1",
		"generate-id#0",
		"generate-id#1",
		"has-children#0",
		"has-children#1",
		"head#1",
		"hours-from-dateTime#1",
		"hours-from-duration#1",
		"hours-from-time#1",
		"id#1",
		"id#2",
		"idref#1",
		"idref#2",
		"implicit-timezone#0",
		"in-scope-prefixes#1",
		"index-of#2",
		"index-of#3",
		"innermost#1",
		"insert-before#3",
		"iri-to-uri#1",
		"json-doc#1",
		"json-doc#2",
		"json-to-xml#1",
		"json-to-xml#2",
		"lang#1",
		"lang#2",
		"last#0",
		"load-xquery-module#1",
		"load-xquery-module#2",
		"local-name#0",
		"local-name#1",
		"local-name-from-QName#1",
		"lower-case#1",
		"matches#2",
		"matches#3",
		"max#1",
		"max#2",
		"min#1",
		"min#2",
		"name#0",
		"name#1",
		"namespace-uri#0",
		"namespace-uri#1",
		"namespace-uri-for-prefix#2",
		"namespace-uri-from-QName#1",
		"nilled#0",
		"nilled#1",
		"node-name#0",
		"node-name#1",
		"normalize-space#0",
		"normalize-space#1",
		"normalize-unicode#1",
		"normalize-unicode#2",
		"not#1",
		"number#0",
		"number#1",
		"one-or-more#1",
		"outermost#1",
		"parse-ietf-date#1",
		"parse-json#1",
		"parse-json#2",
		"parse-xml#1",
		"parse-xml-fragment#1",
		"path#0",
		"path#1",
		"position#0",
		"prefix-from-QName#1",
		"remove#2",
		"replace#3",
		"replace#4",
		"resolve-QName#2",
		"resolve-uri#1",
		"resolve-uri#2",
		"reverse#1",
		"root#0",
		"root#1",
		"round#1",
		"round#2",
		"minutes-from-dateTime#1",
		"minutes-from-duration#1",
		"minutes-from-time#1",
		"month-from-date#1",
		"month-from-dateTime#1",
		"months-from-duration#1",
		"round-half-to-even#1",
		"round-half-to-even#2",
		"seconds-from-dateTime#1",
		"seconds-from-duration#1",
		"seconds-from-time#1",
		"serialize#1",
		"serialize#2",
		"sort#1",
		"sort#2",
		"sort#3",
		"tail#1",
		"timezone-from-date#1",
		"timezone-from-dateTime#1",
		"timezone-from-time#1",
		"adjust-date-to-timezone#1",
		"adjust-date-to-timezone#2",
		"adjust-dateTime-to-timezone#1",
		"adjust-dateTime-to-timezone#2",
		"adjust-time-to-timezone#1",
		"adjust-time-to-timezone#2",
		"tokenize#1",
		"tokenize#2",
		"tokenize#3",
		"trace#1",
		"trace#2",
		"transform#1",
		"translate#3",
		"true#0",
		"unordered#1",
		"unparsed-text#1",
		"unparsed-text#2",
		"unparsed-text-available#1",
		"unparsed-text-available#2",
		"unparsed-text-lines#1",
		"unparsed-text-lines#2",
		"upper-case#1",
		"uri-collection#0",
		"uri-collection#1",
		"xml-to-json#1",
		"xml-to-json#2",
		"year-from-date#1",
		"year-from-dateTime#1",
		"years-from-duration#1",
		"random-number-generator#0",
		"random-number-generator#1",
		"zero-or-one#1",

		"accumulator-after#1",
		"accumulator-before#1",
		"available-system-properties#0",
		"copy-of#0",
		"copy-of#1",
		"current#0",
		"current-group#0",
		"current-grouping-key#0",
		"current-merge-group#0",
		"current-merge-group#1",
		"current-merge-key#0",
		"current-output-uri#0",
		"document#1",
		"document#2",
		"element-available#1",
		"function-available#1",
		"function-available#2",
		"key#2",
		"key#3",
		"permute#1",
		"next#0",
		"regex-group#1",
		"snapshot#0",
		"snapshot#1",
		"stream-available#1",
		"system-property#1",
		"type-available#1",
		"unparsed-entity-public-id#1",
		"unparsed-entity-public-id#2",
		"unparsed-entity-uri#1",
		"unparsed-entity-uri#2"
	];

	public static readonly xpath40 = [
    "all#2",
		"characters#1",
		"highest#1",
		"highest#2",
		"highest#3",
		"identity#1",
		"in-scope-namespace#1",
		"index-where#2",
		"is-NAN#1",
		"items-after#2",
		"items-before#2",
		"items-from#2",
		"items-until#2",
		"lowest#1",
		"lowest#2",
		"lowest#3",
		"parcel#1",
		"parts#1",
		"range#0",
		"slice#4",
		"some#2",
		"unparcel#1"
	].concat(FunctionData.xpath);

	public static readonly array = [
		"append#2",
		"filter#2",
		"flatten#1",
		"fold-left#3",
		"fold-right#3",
		"for-each#2",
		"for-each-pair#3",
		"get#2",
		"head#1",
		"insert-before#3",
		"join#1",
		"put#3",
		"remove#2",
		"reverse#1",
		"size#1",
		"sort#1",
		"sort#2",
		"sort#3",
		"subarray#2",
		"subarray#3",
		"tail#1"
	];

	public static readonly array40 = [
		"members#1",
		"of#1"
	].concat(FunctionData.array);

	public static readonly map = [
		"contains#2",
		"entry#2",
		"find#2",
		"for-each#2",
		"get#2",
		"keys#1",
		"merge#1",
		"merge#2",
		"put#3",
		"remove#2",
		"size#1"
	];

	public static readonly map40 = [
		"entries#1"
	].concat(FunctionData.map);

	public static readonly ixsl = [
		"apply#2",
		"call#3",
		"contains#2",
		"eval#1",
		"event#0",
		"get#2",
		"location#0",
		"page#0",
		"query-params#0",
		"source#2",
		"style#0",
		"style#1",
		"window#0",
	];

	public static readonly math = [
		"acos#1",
		"asin#1",
		"atan#1",
		"atan2#2",
		"cos#1",
		"exp#1",
		"exp10#1",
		"log#1",
		"log10#1",
		"pi#0",
		"pow#2",
		"sin#1",
		"sqrt#1",
		"tan#1"
	];

	public static readonly schema = [
		"string#1",
		"boolean#1",
		"integer#1",
		"int#1",
		"decimal#1",
		"float#1",
		"double#1",
		"duration#1",
		"dateTime#1",
		"time#1",
		"date#1",
		"gYearMonth#1",
		"gYear#1",
		"gMonthDay#1",
		"gDay#1",
		"gMonth#1",
		"hexBinary#1",
		"base64Binary#1",
		"anyURI#1",
		"QName#1",
		"normalizedString#1",
		"token#1",
		"language#1",
		"NMTOKEN#1",
		"Name#1",
		"NCName#1",
		"ID#1",
		"IDREF#1",
		"ENTITY#1",
		"nonPositiveInteger#1",
		"negativeInteger#1",
		"long#1",
		"short#1",
		"byte#1",
		"nonNegativeInteger#1",
		"unsignedLong#1",
		"unsignedInt#1",
		"unsignedShort#1",
		"unsignedByte#1",
		"positiveInteger#1",
		"yearMonthDuration#1",
		"dayTimeDuration#1",
		"untypedAtomic#1",
		"dateTimeStamp#1"
	];

	private static unionSimpleTypes() {
		const baseSimpleTypes = FunctionData.schema.map(t => 'xs:' + t.substring(0, t.length - 2));
		baseSimpleTypes.push('xs:numeric');
		return baseSimpleTypes;
	}

	public static readonly simpleTypes = FunctionData.unionSimpleTypes();

	public static readonly namespaces = new Map([
		["http://www.w3.org/2005/xpath-functions/array", XSLTnamespaces.Array],
		["http://expath.org/ns/archive", XSLTnamespaces.ExpathArchive],
		["http://expath.org/ns/binary", XSLTnamespaces.ExpathBinary],
		["http://expath.org/ns/file", XSLTnamespaces.ExpathFile],
		["http://www.w3.org/2005/xpath-functions/map", XSLTnamespaces.Map],
		["http://www.w3.org/2005/xpath-functions/math", XSLTnamespaces.Math],
		["http://saxon.sf.net/", XSLTnamespaces.Saxon],
		["http://saxon.sf.net/sql", XSLTnamespaces.SQL],
		["http://www.w3.org/2001/XMLSchema", XSLTnamespaces.XMLSchema],
		["http://www.w3.org/2005/xpath-functions", XSLTnamespaces.XPath],
		["http://www.w3.org/1999/XSL/Transform", XSLTnamespaces.XSLT],
		["http://saxonica.com/ns/interactiveXSLT", XSLTnamespaces.IXSL],
		["http://exslt.org/common", XSLTnamespaces.Exslt],
		["http://exslt.org/math", XSLTnamespaces.ExsltMath],
		["http://exslt.org/regular-expressions", XSLTnamespaces.ExsltRegex],
		["http://exslt.org/sets", XSLTnamespaces.ExsltSets],
		["http://exslt.org/strings", XSLTnamespaces.ExsltStrings],
	]);

	public static readonly contextFunctions = ['base-uri','collection','current','document-uri','generate-id','last','local-name','has-children','name','namespace-uri','node-name','normalize-space', 'path','position','root','uri-collection'];

	public static readonly ixslEventName = [
		'ixsl:onafterprint',
		'ixsl:onbeforeprint',
		'ixsl:onbeforeunload',
		'ixsl:onerror',
		'ixsl:onhashchange',
		'ixsl:onload',
		'ixsl:onmessage',
		'ixsl:onoffline',
		'ixsl:ononline',
		'ixsl:onpagehide',
		'ixsl:onpageshow',
		'ixsl:onpopstate',
		'ixsl:onresize',
		'ixsl:onstorage',
		'ixsl:onunload',
		'ixsl:onblur',
		'ixsl:onchange',
		'ixsl:oncontextmenu',
		'ixsl:onfocus',
		'ixsl:oninput',
		'ixsl:oninvalid',
		'ixsl:onreset',
		'ixsl:onsearch',
		'ixsl:onselect',
		'ixsl:onsubmit',
		'ixsl:onkeydown',
		'ixsl:onkeypress',
		'ixsl:onkeyup',
		'ixsl:onclick',
		'ixsl:ondblclick',
		'ixsl:onmousedown',
		'ixsl:onmousemove',
		'ixsl:onmouseout',
		'ixsl:onmouseover',
		'ixsl:onmouseup',
		'ixsl:onmousewheel',
		'ixsl:onwheel',
		'ixsl:ondrag',
		'ixsl:ondragend',
		'ixsl:ondragenter',
		'ixsl:ondragleave',
		'ixsl:ondragover',
		'ixsl:ondragstart',
		'ixsl:ondrop',
		'ixsl:onscroll',
		'ixsl:oncopy',
		'ixsl:oncut',
		'ixsl:onpaste',
		'ixsl:onabort',
		'ixsl:oncanplay',
		'ixsl:oncanplaythrough',
		'ixsl:oncuechange',
		'ixsl:ondurationchange',
		'ixsl:onemptied',
		'ixsl:onended',
		'ixsl:onerror',
		'ixsl:onloadeddata',
		'ixsl:onloadedmetadata',
		'ixsl:onloadstart',
		'ixsl:onpause',
		'ixsl:onplay',
		'ixsl:onplaying',
		'ixsl:onprogress',
		'ixsl:onratechange',
		'ixsl:onseeked',
		'ixsl:onseeking',
		'ixsl:onstalled',
		'ixsl:onsuspend',
		'ixsl:ontimeupdate',
		'ixsl:onvolumechange',
		'ixsl:onwaiting'
	];
}