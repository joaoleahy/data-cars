import { useLocation, useNavigate } from 'react-router-dom';

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

interface AsideMenuListItem {
  icon: JSX.Element;
  label: string;
  active: boolean;
  handleClick: () => void;
}

function AsideMenu() {
  const urlParts = useLocation().pathname.split('/');
  const navigate = useNavigate();

  const currentLocation = urlParts[urlParts.length - 1];

  const listItems: AsideMenuListItem[] = [
    {
      icon: <DirectionsCarIcon />,
      label: 'Cadastro de veículos',
      active: currentLocation === 'vehicle-panel',
      handleClick: () => navigate('vehicle-panel'),
    },
    {
      icon: <LocalGasStationIcon />,
      label: 'Abastecimento de veículos',
      active: currentLocation === 'vehicle-supply-panel',
      handleClick: () => navigate('vehicle-supply-panel'),
    },
  ];

  return (
    <nav aria-label="opções da Administração">
      <List
        subheader={
          <>
            <ListSubheader component="div">Administração</ListSubheader>
            <Divider />
          </>
        }
      >
        {listItems.map(({ icon, label, active, handleClick }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton selected={active} onClick={handleClick}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  );
}

export default AsideMenu;
