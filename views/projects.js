// Disable buttons during animations to prevent overlapping actions
let isAnimating = false;

function move(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const track = document.getElementById('slider-track');
    const boxToClone = direction === 'left' ? track.lastElementChild : track.firstElementChild;

    const clones = [boxToClone.cloneNode(true), boxToClone.cloneNode(true)];
    clones.forEach(clone => {
        clone.classList.add('shrunk');
        direction === 'left'
            ? track.insertBefore(clone, track.firstElementChild)
            : track.appendChild(clone);
        void clone.offsetWidth; // force reflow
        clone.classList.remove('shrunk');
    });

    const [firstToRemove, lastToRemove] = [track.firstElementChild, track.lastElementChild];

    setTimeout(() => {
        [firstToRemove, lastToRemove].forEach(el => el.classList.add('shrunk'));

        setTimeout(() => {
            [firstToRemove, lastToRemove].forEach(el => {
                if (track.contains(el)) track.removeChild(el);
            });
            isAnimating = false;
        }, 500);
    }, 600);
}