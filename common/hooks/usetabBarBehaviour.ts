interface Props {
  setIsArticle: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHorario: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProffile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usetabBarBehaviour = ({
  setIsArticle,
  setIsHorario,
  setIsProffile,
}: Props) => {
  const handleItemSelected = (item: number) => {
    if (item === 3) {
      setIsProffile(false);
      setIsHorario(false);
      setIsArticle(true);
      return;
    }
    if (item === 2) {
      setIsProffile(false);
      setIsHorario(true);
      setIsArticle(false);
      return;
    }

    setIsProffile(true);
    setIsHorario(false);
    setIsArticle(false);
  };

  return { handleItemSelected };
};
