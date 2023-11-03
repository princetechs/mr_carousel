import create from 'zustand';

type State = {
    slides: number;
    bgcolour: string;
};

type Actions = {
    updateSlides: (slides: number) => void;
    updateBgColor: (bgcolour: string) => void;
};

const usePersonStore = create<State & Actions>((set) => ({
    slides: 4,
    bgcolour: 'white',
    updateSlides: (slides) => set({ slides }),
    updateBgColor: (bgcolour) => set({ bgcolour }),
}));

export default usePersonStore;
