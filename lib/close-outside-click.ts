import { RefObject } from "react";

export const closeOutsideClick = <T extends HTMLElement>(
	ref: RefObject<T>,
	onClose: () => void
) => {
	const handleClose = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			onClose();
		}
	};
	document.addEventListener("click", handleClose, true);
	return () => document.removeEventListener("click", handleClose, true);
};
