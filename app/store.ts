import create from 'zustand';

type State = {
    slides: number;
    colors: string[];
};

type Actions = {
    updateSlides: (slides: number) => void;
    updateColors: (colors: string[]) => void;
};

const useMenuStore = create<State & Actions>((set) => ({
    slides: 3,
    colors: [],
    updateSlides: (slides) => set({ slides }),
    updateColors: (colors) => set({ colors }),
}));

export default useMenuStore;
