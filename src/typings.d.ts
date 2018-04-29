/* SystemJS module definition */
declare var module: NodeModule;
//Deu certo mais mostra erro só no editor
declare var require: any;

interface NodeModule {
  id: string;
}
/* interface WebpackRequire {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

interface NodeRequire extends WebpackRequire {}

declare var require: NodeRequire; */