export default function Dashboard() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="glass rounded-2xl p-6">
        <div className="text-lg font-semibold mb-2">Start a new video</div>
        <p className="text-[color:var(--muted)] text-sm mb-4">
          Ideas → Titles → Thumbnail → Script → Calendar → Analytics → Assets
        </p>
        <div className="flex gap-2">
          <a href="/dashboard/ideas" className="btn btn-brand">Go to Ideas</a>
          <a href="/dashboard/titles" className="btn bg-[var(--panel-2)] hover:brightness-110">Titles</a>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="text-lg font-semibold mb-2">Recent activity</div>
        <ul className="space-y-2 text-sm text-[color:var(--muted)]">
          <li>Seeds, approvals, uploads, backups.</li>
          <li>Everything tracked here soon.</li>
        </ul>
      </div>
    </div>
  );
}
