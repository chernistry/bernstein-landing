import { slugifyHeading } from '@/lib/blog-headings';
import { AnchorLink } from './AnchorLink';

export function MdxH2({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const text = typeof children === 'string' ? children : '';
  const id = slugifyHeading(text);
  return (
    <h2 id={id} className="mdx-heading" {...props}>
      {children}
      {id && <AnchorLink slug={id} label={text} />}
    </h2>
  );
}
