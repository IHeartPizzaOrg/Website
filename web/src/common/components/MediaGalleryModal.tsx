import MediaPlayer from "./MediaPlayer.tsx";
import type { GameType } from "../../pages/Home/types/GameTypes.ts";

interface MediaGalleryModalProps {
    game: GameType;
    open: boolean;
    selectedMediaIndex: number;
    onClose: () => void;
    onMediaChange: (index: number) => void;
}

export default function MediaGalleryModal({
                                              game,
                                              open,
                                              selectedMediaIndex,
                                              onClose,
                                              onMediaChange,
                                          }: MediaGalleryModalProps) {
    if (!open || !game.media || game.media.length === 0) {
        return null;
    }

    const media = game.media[selectedMediaIndex];

    if (!media) {
        return null;
    }

    const handlePrevious = () => {
        onMediaChange(
            selectedMediaIndex === 0
                ? game.media!.length - 1
                : selectedMediaIndex - 1,
        );
    };

    const handleNext = () => {
        onMediaChange(
            selectedMediaIndex === game.media!.length - 1
                ? 0
                : selectedMediaIndex + 1,
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={media.title}
        >
            <div
                className="panel-flat relative w-full max-w-3xl p-4 sm:p-6"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-3">
                    <p className="caption truncate">
                        {media.title}
                    </p>

                    <button
                        type="button"
                        className="text-d4 font-display text-paper hover:text-red-bright"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                <div className="screen mt-4 flex items-center justify-center overflow-hidden">
                    {media.mediaType === "image" ? (
                        <MediaPlayer
                            title={media.title}
                            type={media.mediaType}
                            link={media.link}
                            style="max-h-[65vh] max-w-full object-contain pixel-img"
                            showCaption={false}
                        />
                    ) : (
                        <div className="aspect-video w-full">
                            <MediaPlayer
                                title={media.title}
                                type={media.mediaType}
                                link={media.link}
                                style="h-full w-full"
                                showCaption={false}
                            />
                        </div>
                    )}
                </div>

                <div className="mt-4 flex justify-between gap-3">
                    <button
                        type="button"
                        className="btn-ghost"
                        onClick={handlePrevious}
                    >
                        Previous
                    </button>

                    <button
                        type="button"
                        className="btn-ghost"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}