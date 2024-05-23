import { Avatar } from '@mui/material';

interface StringAvataProps {
  name: string;
}

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < 3; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const StringAvatar = ({ name }: StringAvataProps) => {
  const props = {
    sx: { bgcolor: stringToColor(name) },
    children:
      name.split(' ').length > 1
        ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        : name[0],
  };
  return <Avatar sizes="small" {...props} />;
};

export default StringAvatar;
