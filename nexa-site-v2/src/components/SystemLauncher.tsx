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
            onClick={onTileSelect}
            onFocus={() => onTileHover(tile.reaction)}
            onMouseEnter={() => onTileHover(tile.reaction)}
            tabIndex={open ? 0 : -1}
          >
            <span>{tile.label}</span>
            <small>{tile.summary}</small>
          </a>
        ))}
      </div>
    </nav>
  );
}
