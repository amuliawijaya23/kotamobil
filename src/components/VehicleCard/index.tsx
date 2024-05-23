import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';

const VehicleCard = ({ listing }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          src="./src/assets/coming-soon.jpg"
          height="250"
          alt="2017 Honda HR-V"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            2017 Honda HR-V
          </Typography>
          <Typography variant="body1">Honda HR-V Bekas</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VehicleCard;
