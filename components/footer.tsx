export function Footer() {
  return (
    <footer className="mt-8 border-t border-neutral-200 py-8 dark:border-neutral-800">
      <p className="text-sm text-neutral-500 dark:text-neutral-500">
        &copy; {new Date().getFullYear()} Lucas Chatham
      </p>
    </footer>
  );
}
