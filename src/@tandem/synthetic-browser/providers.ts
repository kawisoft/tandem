import { SyntheticBrowser } from "./browser";
import { RemoteBrowserService } from "./remote-browser";
import { syntheticElementClassType, SyntheticDOMNode } from "./dom";
import parse5 = require("parse5");
import { 
  Kernel, 
  Provider, 
  CSS_MIME_TYPE,
  HTML_MIME_TYPE,
  MimeTypeProvider, 
  ApplicationServiceProvider,
} from "@tandem/common";

import { 
  HTML_XMLNS, 
  SVG_XMLNS,
  SVG_TAG_NAMES,
  HTML_TAG_NAMES,
  SyntheticHTMLIframeElement, 
  SyntheticHTMLAnchorElement, 
  SyntheticHTMLLinkElement, 
  SyntheticHTMLStyleElement, 
  SyntheticHTMLScriptElement, 
  SyntheticHTMLCanvasElement, 
  SyntheticHTMLElement,
} from "./dom";

export class SyntheticDOMElementClassProvider extends Provider<syntheticElementClassType> {
  static readonly SYNTHETIC_ELEMENT_CLASS_NS = "syntheticMarkupElementClass";

  constructor(readonly xmlns: string, readonly tagName: string, value: syntheticElementClassType) {
    super(SyntheticDOMElementClassProvider.getNamespace(xmlns, tagName), value);
  }

  clone() {
    return new SyntheticDOMElementClassProvider(this.xmlns, this.tagName, this.value);
  }

  static getNamespace(xmlns: string, tagName: string) {
    return [this.SYNTHETIC_ELEMENT_CLASS_NS, encodeURIComponent(xmlns), tagName].join("/");
  }

  static findAll(kernel: Kernel) {
    return kernel.queryAll<SyntheticDOMElementClassProvider>([this.SYNTHETIC_ELEMENT_CLASS_NS, "**"].join("/"));
  }
}

export class MarkupMimeTypeXMLNSProvider extends Provider<string> {
  static readonly MARKUP_MIME_TYPE_XMLNS = "markupMimeTypeXMLNS";
  constructor(readonly mimeType: string, readonly xmlns: string) {
    super(MarkupMimeTypeXMLNSProvider.getNamespace(mimeType), xmlns);
  }
  static getNamespace(mimeType: string) {
    return [this.MARKUP_MIME_TYPE_XMLNS, mimeType].join("/");
  }
  static lookup(path: string, kernel: Kernel): string {
    const mimeType = MimeTypeProvider.lookup(path, kernel);
    const provider = kernel.query<MarkupMimeTypeXMLNSProvider>(this.getNamespace(mimeType));
    return provider && provider.value;
  }
}

export type ElementTextContentMimeTypeGetter = (element: parse5.AST.Default.Node) => string;

export class ElementTextContentMimeTypeProvider extends Provider<ElementTextContentMimeTypeGetter> {
  static readonly NS = "elementTetContentMimeTypes";
  constructor(readonly tagName: string, readonly getter: ElementTextContentMimeTypeGetter) {
    super(ElementTextContentMimeTypeProvider.getId(tagName.toLowerCase()), getter);
  }
  clone() {
    return new ElementTextContentMimeTypeProvider(this.tagName, this.getter);
  }
  static getId(tagName: string) {
    return [this.NS, tagName].join("/");
  }
  static lookup(element: parse5.AST.Default.Node, kernel: Kernel) {
    const provider = kernel.query<ElementTextContentMimeTypeProvider>(this.getId(element.nodeName.toLowerCase()));
    return provider && provider.getter(element);
  }
}

export const createSyntheticHTMLProviders = () => {
  return [
    ...HTML_TAG_NAMES.map((tagName) => new SyntheticDOMElementClassProvider(HTML_XMLNS, tagName, SyntheticHTMLElement)),
    ...SVG_TAG_NAMES.map((tagName) => new SyntheticDOMElementClassProvider(SVG_XMLNS, tagName, SyntheticHTMLElement)),

    new SyntheticDOMElementClassProvider(HTML_XMLNS, "canvas", SyntheticHTMLCanvasElement),
    new SyntheticDOMElementClassProvider(HTML_XMLNS, "link", SyntheticHTMLLinkElement),
    new SyntheticDOMElementClassProvider(HTML_XMLNS, "a", SyntheticHTMLAnchorElement),
    new SyntheticDOMElementClassProvider(HTML_XMLNS, "script", SyntheticHTMLScriptElement),
    new SyntheticDOMElementClassProvider(HTML_XMLNS, "style", SyntheticHTMLStyleElement),
    new SyntheticDOMElementClassProvider(HTML_XMLNS, "iframe", SyntheticHTMLIframeElement),
    new ElementTextContentMimeTypeProvider("style", () => "text/css"),

    // TODO - move these to htmlCoreProviders
    // mime types
    new MimeTypeProvider("css", CSS_MIME_TYPE),
    new MimeTypeProvider("htm", HTML_MIME_TYPE),
    new MimeTypeProvider("html", HTML_MIME_TYPE),
  ];
}