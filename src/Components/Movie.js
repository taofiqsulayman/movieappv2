import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';




const IMG_API = "https://image.tmdb.org/t/p/w1280";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#2b463c',
  boxShadow: 20,
  p: 4,
  // color: 'white',
};


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
      
        <Typography>{children}</Typography>
      
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}






const Movie = ({title, poster_path, overview, release_date, vote_average, vote_count, id}) => {

  const [open, setOpen] = useState(false);
  

  const [value, setValue] = useState(0);

  const [casts, setCasts] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    getCast();
  };



  const handleClose = () => setOpen(false);

  const handleTab = (event, newValue) => {
    setValue(newValue);
  };


  const getCast = () => {

    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=19a9c9fad8512cbc1824cd036e881463&language=en-US`

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // setCasts(data.results);
      // cut the first 10 cast members
      setCasts(data.cast.slice(0, 10));
    });
  };


  
  return (

      <div className='movie'>
      <div className="movie-title">
        <h5>{title}</h5>
      </div>

      <div>

        <img src={IMG_API + poster_path} alt={title} onClick={handleOpen} />

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >

        <Box sx={style}>
            <Typography id="modal-modal-title" sx={{ color: "#f4f1e9" }} variant="h6" component="h2">
              {title}
            </Typography>


            <Tabs value={value} onChange={handleTab} aria-label="basic tabs example">
              <Tab sx={{color:"#f4f1e9"}} label="Movie Info" {...a11yProps(0)} />
              <Tab sx={{color:"#f4f1e9"}} label="Cast" {...a11yProps(1)} />
            </Tabs>

          <TabPanel value={value} index={0}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div>
                <Grid container spacing={0} columns={4}>
                  <Grid item xs={1}>
                    <p style={{ color: "#f4f1e9"}}>Released: </p>
                  </Grid>
                  <Grid item xs={3}>
                    <p style={{ color: "#f4f1e9"}}>{release_date}</p>
                  </Grid>
                </Grid>

                <Grid container spacing={0} columns={4}>
                  <Grid item xs={1}>
                    <p style={{ color: "#f4f1e9"}}>Rating: </p>
                  </Grid>
                  <Grid item xs={3}>
                    <p style={{ color: "#f4f1e9"}}>{vote_average} ({vote_count} votes)</p>
                  </Grid>
                </Grid>

                <Grid container spacing={0} columns={4}>
                  <Grid item xs={1}>
                    <p style={{ color: "#f4f1e9"}}>Story: </p>
                  </Grid>
                  <Grid item xs={3}>
                    <p style={{ color: "#f4f1e9"}}>{overview}</p>
                  </Grid>
                </Grid>
              </div>
            </Typography>
          </TabPanel>

        
          <TabPanel value={value} index={1}>
          <>
            {casts.map((member, index) => {
              return (
                <Button
                  fullWidth
                  key={index}
                  data-id={member.id}
                  data-name={member.name}
                  sx={{ color: "#f4f1e9", textDecoration: "none", textTransform: "none", textAlign:'left', display:'flex', flexDirection:'row', whiteSpace:'nowrap'}}
                >{member.name} as <span style={{margin:1.5, padding: 1, textOverflow:'ellipsis', overflow: "hidden", whiteSpace:"nowrap"}}>{member.character}</span></Button>
              );
            })}
          </>
          </TabPanel>

          <Button fullWidth 
          sx={{color: "#b1d182", border: 1, borderRadius:1, textTransform: 'none', marginTop: 2 }}
          onClick={handleClose}>
            Close
          </Button>
          
        </Box>
      </Modal>
      </div>

      <div className="movie-info">
        <h5>{release_date}</h5>
      </div>

    </div>
    
  );
};

export default Movie;