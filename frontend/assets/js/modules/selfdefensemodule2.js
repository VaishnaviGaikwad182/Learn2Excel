document.addEventListener("DOMContentLoaded", function () {
    const draggables = document.querySelectorAll(".draggable");
    const dropZones = document.querySelectorAll(".drop-zone");

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.id);
            event.target.classList.add("dragging");
        });

        draggable.addEventListener("dragend", () => {
            draggable.classList.remove("dragging");
        });
    });

    dropZones.forEach(dropZone => {
        dropZone.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropZone.classList.add("hovered");
        });

        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("hovered");
        });

        dropZone.addEventListener("drop", (event) => {
            event.preventDefault();
            dropZone.classList.remove("hovered");

            const draggableId = event.dataTransfer.getData("text/plain");
            const draggedElement = document.getElementById(draggableId);

            if (!draggedElement) return;

            if (
                dropZone.dataset.answer.trim() ===
                draggedElement.textContent.trim()
            ) {
                dropZone.textContent = `✅ ${draggedElement.textContent}`;
                draggedElement.style.display = "none";
            } else {
                alert("Incorrect placement! Try again.");
            }
        });
    });
});
