import { ExternalValue, Externals, TransformModuleNameFn } from './types';
import * as ESTree from 'estree';
declare type Specifiers = (ESTree.ImportSpecifier | ESTree.ImportDefaultSpecifier | ESTree.ImportNamespaceSpecifier | ESTree.ExportSpecifier)[];
export declare function replaceImports(specifiers: Specifiers, externalValue: ExternalValue, transformModuleName: TransformModuleNameFn): string;
export declare function replaceRequires(code: string, externals: Externals, transformModuleName: TransformModuleNameFn): string;
export {};
