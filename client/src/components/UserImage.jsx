import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserImage = ({ image, size = '60px', userId }) => {
  const navigate = useNavigate();

  return (
    <Box
      width={size}
      height={size}
      onClick={() => {
        navigate(`/profile/${userId}`);
        navigate(0);
      }}
    >
      <img
        style={{ objectFit: 'cover', borderRadius: '50%', cursor: 'pointer' }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
