export interface SlideWindowProps {
  isOpenSlider: boolean;
  closeOpenSlider?: () => void;
  windowTitle?: string | undefined;
  children?: JSX.Element;
}
