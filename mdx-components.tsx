import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => <h2 className="text-2xl font-semibold text-cyan-300 mb-4 mt-8">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-medium text-cyan-200 mb-3 mt-6">{children}</h3>,
    p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
    ul: ({ children }) => <ul className="text-gray-300 mb-4 space-y-2">{children}</ul>,
    li: ({ children }) => (
      <li className="flex items-start">
        <span className="text-cyan-400 mr-2">•</span>
        <span>{children}</span>
      </li>
    ),
    strong: ({ children }) => <strong className="text-cyan-400 font-semibold">{children}</strong>,
    ...components,
  }
}
