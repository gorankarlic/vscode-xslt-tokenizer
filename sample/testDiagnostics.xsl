<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:array="http://www.w3.org/2005/xpath-functions/array"
                xmlns:map="http://www.w3.org/2005/xpath-functions/map"
                xmlns:math="http://www.w3.org/2005/xpath-functions/math"
                exclude-result-prefixes="#all"
                expand-text="yes"
                version="3.0">
    
    <!-- Simple expressions that are rightly reported as valid -->
    <xsl:variable name="t1" select="a/ 2"/>
    <xsl:variable name="t4" select="+ a"/>
    <xsl:variable name="t5" select="- a"/>
    
    <!-- Simple expressions that should report an error -->  
    <xsl:variable name="t20" select="///"/>
    <xsl:variable name="t2" select="a/ instance of 2"/>
    <xsl:variable name="t3" select="a/ instancexx of 2"/>
    
    <!-- tests -->
    <xsl:variable name="t6" select="for $a in b return c"/>
    <xsl:variable name="t7" select="a/ div 2"/>
    
</xsl:stylesheet>