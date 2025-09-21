import "./StatItem.css";

export default function StatItem({ icon: Icon, label, value, className = "" }) {
  return (
    <div className={`stat-item ${className}`}>
      {Icon && <Icon className="stat-icon" aria-hidden />}
      {label && <span className="stat-label">{label}</span>}
      <strong className="stat-value">{value}</strong>
    </div>
  );
}
