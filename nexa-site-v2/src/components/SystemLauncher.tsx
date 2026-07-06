import type { LauncherTile } from "../data/tiles";
import type { FaceEvent } from "../scripts/contracts/faceStateMachine";

interface SystemLauncherProps {
  open: boolean;
  tiles: LauncherTile[];
  onTileHover: (event: FaceEvent) => void;
  onTileSelect: () => void;
}

export default function SystemLauncher({ open, tiles, onTileHover, onTileSelect }: SystemLauncherProps) {
  return (
    <nav className="system-launcher" data-open={open ? "true" : "false"} aria-label="NeXa system launcher" aria-hidden={!open}>
      <div className="launcher-grid">
        {tiles.map((tile) => (
          <a
            className="launcher-tile"
            data-launcher-tile
            href={tile.href}
            key={tile.id}
            aria-label={`${tile.label}: ${tile.summary}`}
            data-category={tile.category}
            onClick={onTileSelect}
            onFocus={() => onTileHover(tile.reaction)}
            onMouseEnter={() => onTileHover(tile.reaction)}
            tabIndex={open ? 0 : -1}
          >
            <span className="launcher-icon" aria-hidden="true">
              <LauncherIcon iconKey={tile.iconKey} />
            </span>
            <span className="launcher-copy">
              <strong>{tile.label}</strong>
              <small>{tile.summary}</small>
            </span>
            <span className="launcher-category">{tile.category}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function LauncherIcon({ iconKey }: { iconKey: LauncherTile["iconKey"] }) {
  if (iconKey === "prototype") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <rect x="6" y="7" width="12" height="9" rx="3" />
        <path d="M9 17h6M8 7V4m8 3V4" />
        <circle cx="10" cy="11.5" r="1.2" />
        <circle cx="14" cy="11.5" r="1.2" />
      </svg>
    );
  }

  if (iconKey === "hardware") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M4 9h3m-3 6h3m10-6h3m-3 6h3M9 4v3m6-3v3M9 17v3m6-3v3" />
      </svg>
    );
  }

  if (iconKey === "story") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M6 6h12M6 12h10M6 18h7" />
        <circle cx="5" cy="6" r="1" />
        <circle cx="5" cy="12" r="1" />
        <circle cx="5" cy="18" r="1" />
      </svg>
    );
  }

  if (iconKey === "code") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="m9 8-4 4 4 4m6-8 4 4-4 4M13 6l-2 12" />
      </svg>
    );
  }

  if (iconKey === "demo") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <circle cx="12" cy="12" r="8" />
        <path d="m10.5 8.5 5 3.5-5 3.5z" />
      </svg>
    );
  }

  if (iconKey === "roadmap") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M5 18c3-8 8 1 11-7l2-5M15 6h3v3" />
        <circle cx="5" cy="18" r="1.5" />
        <circle cx="12" cy="14" r="1.5" />
      </svg>
    );
  }

  if (iconKey === "boundary") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M12 4 5 7v5c0 4 2.8 6.7 7 8 4.2-1.3 7-4 7-8V7z" />
        <path d="M9 12h6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="12" r="7" />
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
