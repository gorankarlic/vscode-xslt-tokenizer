<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:array="http://www.w3.org/2005/xpath-functions/array"
                xmlns:map="http://www.w3.org/2005/xpath-functions/map"
                xmlns:ext="xpath.result.to.json"
                exclude-result-prefixes="#all"
                version="3.0">
  
  <!--
       (c) DeltaXML ltd. 2023
       Intended for XSLT/XPath debugging in combination with the 'xsl:message' instruction and 'trace()' function:
       Converts the result of an XPath expression to a notation similar to JSON. Main differences:
       1. XPath sequences are represented with parenthesis like: '(1,2,3,4)'
       2. Map keys are enclosed in single-quotes and then only if they are of type xs:string
       3. Atomic values are enclosed in single-quotes but then only if they are of type xs:string
       4. Boolean values are represented as: true() and false()
       5. Nodes are represented by XPath locations - namespace-prefixes are used in the location if declared on the context root element
  -->
  
  <xsl:variable name="product-version-parts" static="yes" as="xs:string+" 
    select="system-property('Q{http://www.w3.org/1999/XSL/Transform}product-version') => tokenize('\s+')"/>
  <xsl:variable name="saxon-major-minor-patch" static="yes" as="xs:string*" select="$product-version-parts[2] => tokenize('\.')"/>
  <xsl:variable name="major" static="yes" as="xs:integer" select="$saxon-major-minor-patch[1] => xs:integer()"/>
  <xsl:variable name="minor" static="yes" as="xs:integer" select="($saxon-major-minor-patch[2] => xs:integer(), 0)[1]"/>
  <xsl:variable name="patch" static="yes" as="xs:integer" select="($saxon-major-minor-patch[3] => xs:integer(), 0)[1]"/>
  <xsl:variable name="patch-version" static="yes" as="xs:integer" select="($saxon-major-minor-patch[4] => xs:integer(), 0)[1]"/>
  <!-- Only Saxon 9.9.0.1 and previous versions can use ANSI escape sequences for colors: -->
  <xsl:variable name="useColors" static="yes" as="xs:boolean" 
    select="($major lt 8) or ($major eq 9 and $minor lt 9) or ($major eq 9 and $minor eq 9 and $patch eq 0 and $patch-version le 1)"/>
  <xsl:variable name="colorDataName" static="yes" as="xs:string" 
    select="if ($useColors) then 'color-data.xsl' else 'color-data-empty.xsl'"/>
  
  <xsl:include _href="{$colorDataName}"/>
  
  <xsl:variable name="xmlnsMap" as="map(*)" select="ext:getURItoPrefixMap(/*)"/>
  
  <xsl:function name="ext:println" as="xs:string">
    <xsl:param name="xdmValue" as="item()*"/>
    <xsl:sequence select="ext:print($xdmValue) || $LF"/>
  </xsl:function>
  
  <xsl:function name="ext:print" as="xs:string">
    <xsl:param name="xdmValue" as="item()*"/>
    <xsl:variable name="enclosedItems" as="element()" select="ext:buildResultTree($xdmValue)"/>
    <xsl:sequence select="ext:xml-to-xdm($enclosedItems)"/>
  </xsl:function>
  
  <xsl:function name="ext:getURItoPrefixMap" as="map(xs:anyURI, xs:string)">
    <xsl:param name="source" as="node()"/>
    <xsl:sequence 
      select="
        map:merge(
          for $pfx in in-scope-prefixes($source),
            $ns in namespace-uri-for-prefix($pfx, $source)
          return 
            map:entry($ns, $pfx)
        )"/>
  </xsl:function>
  
  <xsl:variable name="regex" as="xs:string" select="'Q\{[^\{]*\}'"/>
  
  <xsl:function name="ext:tidyXPath" as="xs:string*">
    <xsl:param name="node" as="node()"/>
    <xsl:variable name="parts" as="xs:string*">
      <xsl:analyze-string select="path($node)" regex="{$regex}">
        <xsl:matching-substring>
          <xsl:variable name="uri" as="xs:string" select="substring(., 3, string-length(.) - 3)"/>
          <xsl:variable name="pfx" select="map:get($xmlnsMap, $uri)"/>
          <xsl:sequence select="if (string-length($pfx) eq 0) then '' else $pfx || ':'"/>
        </xsl:matching-substring>
        <xsl:non-matching-substring>
          <xsl:sequence select="."/>
        </xsl:non-matching-substring>
      </xsl:analyze-string>
    </xsl:variable>
    <xsl:sequence select="string-join($parts)"/>
  </xsl:function>
  
  <xsl:function name="ext:convertMapEntry">
    <xsl:param name="k" as="xs:anyAtomicType?"/>
    <xsl:param name="value" as="item()*"/>
    
    <xsl:variable name="key" as="xs:string" select="
      let $sk := serialize($k) return if ($k instance of xs:string) then '''' || $sk || '''' else $sk"/>
    
    <xsl:choose>
      <xsl:when test="count($value) gt 1">
        <sequence>
          <xsl:if test="$key">
            <xsl:attribute name="key" select="$key"/>
          </xsl:if>
          <xsl:for-each select="$value">
            <xsl:call-template name="encloseItem"/>
          </xsl:for-each>
        </sequence>
      </xsl:when>
      <xsl:when test="exists($value)">
        <xsl:for-each select="$value">
          <xsl:call-template name="encloseItem">
            <xsl:with-param name="key" select="$key"/>
          </xsl:call-template>
        </xsl:for-each>
      </xsl:when>
      <xsl:otherwise>
        <sequence key="{$key}"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:function>
  
  <xsl:function name="ext:buildResultTree">
    <xsl:param name="value" as="item()*"/>
    <xsl:choose>
      <xsl:when test="count($value) gt 1">
        <sequence>
          <xsl:for-each select="$value">
            <xsl:call-template name="encloseItem"/>
          </xsl:for-each>
        </sequence>
      </xsl:when>
      <xsl:when test="exists($value)">
        <xsl:for-each select="$value">
          <xsl:call-template name="encloseItem"/>
        </xsl:for-each>
      </xsl:when>
      <xsl:otherwise>
        <sequence/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:function>
  
  <xsl:template name="encloseItem">
    <xsl:param name="key" as="xs:string?"/>
    
    <xsl:choose>     
      <xsl:when test=". instance of node() 
        or . instance of text()
        or . instance of attribute()
        or . instance of processing-instruction()
        or . instance of comment()">        
        <path>
          <xsl:if test="$key">
            <xsl:attribute name="key" select="$key"/>
          </xsl:if>
          <xsl:sequence select="ext:tidyXPath(.)"/>
        </path>
      </xsl:when>
      
      <xsl:when test=". instance of map(*)">
        <map>
          <xsl:if test="$key">
            <xsl:attribute name="key" select="$key"/>
          </xsl:if>
          <xsl:sequence select="map:for-each(., ext:convertMapEntry#2)"/>
        </map>
      </xsl:when>
      
      <xsl:when test=". instance of array(*)">        
        <array>
          <xsl:if test="$key">
            <xsl:attribute name="key" select="$key"/>
          </xsl:if>
          <xsl:sequence select="array:for-each(., ext:buildResultTree#1)"/>
        </array>
      </xsl:when>
      
      <xsl:otherwise expand-text="yes">        
        <atomicValue>
          <xsl:if test="$key">
            <xsl:attribute name="key" select="$key"/>
          </xsl:if>
          <xsl:variable name="val" select="serialize(., map {'method': 'text'})"/>
          <xsl:choose>
            <xsl:when test=". instance of xs:boolean"><xsl:attribute name="type" select="'boolean'"/>{$val}()</xsl:when>
            <xsl:when test=". instance of xs:string"><xsl:attribute name="type" select="'string'"/>'{$val}'</xsl:when>
            <xsl:when test=". instance of xs:numeric"><xsl:attribute name="type" select="'numeric'"/>{$val}</xsl:when>
            <xsl:otherwise>{$val}</xsl:otherwise>
          </xsl:choose>         
        </atomicValue>       
      </xsl:otherwise> 
      
    </xsl:choose>
  </xsl:template>
  
  <xsl:function name="ext:xml-to-xdm" as="xs:string">
    <xsl:param name="top" as="element()"/>
    <xsl:sequence select="ext:writeEnclosedItem($top) => string-join('')"/>
  </xsl:function>
  
  <xsl:function name="ext:writeEnclosedItem" as="xs:string*">
    <xsl:param name="c.x" as="item()*"/>
    
    <xsl:variable name="parts" as="xs:string*">
      <xsl:for-each select="$c.x">
        <xsl:variable name="key" as="xs:string" select="if (@key) then $RED || @key || $RESET || ':' else ''"/>        
        <xsl:choose>
          <xsl:when test="self::sequence">
            <xsl:sequence select="$key || '(' || ext:writeEnclosedItem(node()) => string-join(',') || ')'"/>
          </xsl:when>
          <xsl:when test="self::array">
            <xsl:sequence select="$key || '[' || ext:writeEnclosedItem(node()) => string-join(',') || ']'"/>
          </xsl:when>
          <xsl:when test="self::map">
            <xsl:sequence select="$key || '{' || ext:writeEnclosedItem(node()) => string-join(',') || '}'"/>
          </xsl:when>
          <xsl:when test="self::path">
            <xsl:value-of select="$key || $YELLOW || node() || $RESET"/>
          </xsl:when>
          <xsl:when test="self::atomicValue">
            <xsl:variable name="color" as="xs:string" 
              select="if (@type eq 'string') then $BLUE else if (@type eq 'boolean') then $GREEN else if (@type eq 'numeric') then $MAGENTA else $CYAN"/>
            <xsl:value-of select="$key || $color || node() || $RESET"/>
          </xsl:when>     
          <xsl:otherwise>
            <xsl:value-of select="$key || node()"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
    </xsl:variable>
    <xsl:sequence select="$parts"/>    
  </xsl:function>
  
</xsl:stylesheet>