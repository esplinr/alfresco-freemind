package freemind.transform;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.alfresco.repo.content.MimetypeMap;
import org.alfresco.repo.content.transform.AbstractContentTransformer2;
import org.alfresco.service.cmr.repository.ContentReader;
import org.alfresco.service.cmr.repository.ContentWriter;
import org.alfresco.service.cmr.repository.TransformationOptions;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;

public class FreemindTransformer extends AbstractContentTransformer2 {
	private static final Logger LOG = Logger.getLogger(FreemindTransformer.class);
	private static final String FREEMIND_FREEMIND2TEXT_XSL = "META-INF/resources/freemind/freemind2text.xsl";
	private final DocumentBuilderFactory dfactory = DocumentBuilderFactory.newInstance();
	private final TransformerFactory tFactory = TransformerFactory.newInstance();
	private final Transformer transformer; 
    
    public FreemindTransformer() throws Exception {
    	if (LOG.isDebugEnabled()) LOG.debug("INIT - " + FREEMIND_FREEMIND2TEXT_XSL);
    	dfactory.setNamespaceAware(true);
    	InputStream in = FreemindTransformer.class.getClassLoader().getResourceAsStream(FREEMIND_FREEMIND2TEXT_XSL);
    	try {
	    	if (null == in) {
	    		LOG.error("in is null!", new Exception(FREEMIND_FREEMIND2TEXT_XSL));
	    	}
	    	if (LOG.isDebugEnabled()) {
	    		LOG.debug(IOUtils.toString(in));
	    		in = FreemindTransformer.class.getClassLoader().getResourceAsStream(FREEMIND_FREEMIND2TEXT_XSL);
	    	}
	    	 if (LOG.isTraceEnabled()) LOG.trace("Resource: " + in);
	    	transformer = tFactory.newTransformer(new StreamSource(in));
    	} finally {
    		IOUtils.closeQuietly(in);
    	}
    	if (LOG.isTraceEnabled()) LOG.trace("COMPLETED");
    }
  @Override
  public boolean isTransformable(String sourceMimetype,
      String targetMimetype, TransformationOptions options) {
	  if (LOG.isDebugEnabled()) LOG.debug("isTransformable form: " + sourceMimetype + " to " + targetMimetype);
    if (freemind.mimetype.MimetypeMap.MIMETPYE_FREEMIND.equalsIgnoreCase(sourceMimetype)
     
    		&& MimetypeMap.MIMETYPE_TEXT_PLAIN.equalsIgnoreCase(targetMimetype)) {
    	if (LOG.isTraceEnabled()) LOG.trace("TRUE");
      return true;
    }
    if (LOG.isTraceEnabled()) LOG.trace("FALSE");
    return false;
  }

  @Override
  protected void transformInternal(ContentReader reader,
      ContentWriter writer, TransformationOptions options)
      throws Exception {
	  if (LOG.isDebugEnabled()) LOG.debug("TRANSFORM " + options);
	  OutputStream os = writer.getContentOutputStream();
	  
	  if (LOG.isTraceEnabled()) LOG.trace("OS " + os);
    OutputStream out = new BufferedOutputStream(os);
    if (LOG.isTraceEnabled()) LOG.trace("OutputStream");
    InputStream in = null;
    try {

      in = reader.getContentInputStream();
      if (LOG.isTraceEnabled()) {LOG.trace("InputStream" + IOUtils.toString(in));
      in.reset();}
      Document doc = dfactory.newDocumentBuilder().parse(in);

      if (LOG.isDebugEnabled()) {
    	  
    	  LOG.debug("Document " + doc.toString());
    	  printDocument(doc, System.out);
      }
      transformer.transform(new DOMSource(doc), new StreamResult(out));

      if (LOG.isTraceEnabled()) LOG.trace("END");
    } finally {
    	IOUtils.closeQuietly(out);
    	IOUtils.closeQuietly(in);
    }
  }
  public static void printDocument(Document doc, OutputStream out) throws IOException, TransformerException {
	    TransformerFactory tf = TransformerFactory.newInstance();
	    Transformer transformer = tf.newTransformer();
	    transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
	    transformer.setOutputProperty(OutputKeys.METHOD, "xml");
	    transformer.setOutputProperty(OutputKeys.INDENT, "yes");
	    transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
	    transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");

	    transformer.transform(new DOMSource(doc), 
	         new StreamResult(new OutputStreamWriter(out, "UTF-8")));
	}

}