<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output omit-xml-declaration="yes" indent="no"/>
    <xsl:template match="/">
     <xsl:call-template name="t1"/>
   </xsl:template>
   <xsl:template name="t1">
     <xsl:for-each select="//node">
       <xsl:value-of select="@TEXT"/>
       <xsl:value-of select="' '"/>
     </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>