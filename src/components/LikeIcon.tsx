interface Props {
  filled?: boolean;
  className?: string;
}

/** Facebook-style thumbs-up. Intentionally not a Bootstrap Icon. */
const LikeIcon = ({ filled = false, className = "w-5 h-5" }: Props) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.8}
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7.5 10.5 12 3.2a.9.9 0 0 1 .8-.45c1.3 0 2.35 1.06 2.35 2.36V9h3.6a2 2 0 0 1 1.96 2.4l-1.4 7A2 2 0 0 1 17.36 20H7.5V10.5Z" />
    <path d="M4.6 10.5h2.9V20H4.6a1.4 1.4 0 0 1-1.4-1.4v-6.7a1.4 1.4 0 0 1 1.4-1.4Z" />
  </svg>
);

export default LikeIcon;
