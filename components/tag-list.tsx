type TagListProps = {
  tags?: readonly string[];
  placement?: "row" | "detail";
};

/**
 * The single sitewide presentation for editorial topic tags.
 * Tags are metadata, not controls; filtering UI should use links or buttons.
 */
export function TagList({ tags, placement = "detail" }: TagListProps) {
  if (!tags?.length) return null;

  return (
    <ul className={`tag-list tag-list--${placement}`} aria-label="Tags">
      {tags.map((tag) => (
        <li className="tag-capsule" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
