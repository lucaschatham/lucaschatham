import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";

function Code({
  children,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  const codeString = typeof children === "string" ? children : "";
  // Only highlight code blocks (inside pre), not inline code
  if (
    props.className ||
    (typeof children === "string" && children.includes("\n"))
  ) {
    const html = highlight(codeString);
    return <code dangerouslySetInnerHTML={{ __html: html }} {...props} />;
  }
  return <code {...props}>{children}</code>;
}

function MdxLink({
  href,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  const isExternal = href?.startsWith("http") ?? false;

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
      {isExternal && <span aria-hidden="true"> ↗</span>}
    </a>
  );
}

const components = {
  a: MdxLink,
  code: Code,
};

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
