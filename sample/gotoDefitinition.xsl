<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:array="http://www.w3.org/2005/xpath-functions/array"
                xmlns:map="http://www.w3.org/2005/xpath-functions/map"
                xmlns:math="http://www.w3.org/2005/xpath-functions/array/math"
                exclude-result-prefixes="#all"
                expand-text="yes"
                version="3.0">
    
    <xsl:output method="xml" indent="yes"/>  
    <xsl:mode on-no-match="shallow-copy"/>
    
    <xsl:import href="import-gotoDefitinition.xsl"/>
    
    
    <xsl:variable name="variable1" as="xs:integer" select="2"/>
    
    
    <xsl:template match="/" mode="#all">
        <xsl:copy>
            <xsl:apply-templates select="" mode="#current"/>
        </xsl:copy>
        <xsl:sequence select="$variable1"/>
        <xsl:sequence select="$import1"/>
        <xsl:sequence select="$import2"/>
        
        <xsl:sequence select="for $range in 1 to 255
            return 
                288 +
                288 +
                290 +
                $range"/>
        
        
        
        
    </xsl:template>
    
    
    
</xsl:stylesheet>