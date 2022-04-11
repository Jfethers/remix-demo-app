import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";

// entry point - first file run in the browser. hydrates react components
hydrate(<RemixBrowser />, document);
