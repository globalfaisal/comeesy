/* -- libs -- */
import React from 'react';

/* -- components -- */
import Posts from '../../components/Posts/Posts';
/* -- mui -- */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

/* -- styles -- */
import './Home.scss';

const Home = props => (
  <div className="home-page">
    <Container>
      <Grid container>
        <Grid item sm={8} xs={12} className="left-container">
          <Posts />
        </Grid>
        <Hidden only="xs">
          <Grid item sm={4} className="right-container">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
            voluptatum aut fugit? Id dolor deleniti aliquam excepturi explicabo
            voluptatibus delectus nam nisi illo, corporis ad. Voluptate
            consectetur eligendi assumenda officia.
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  </div>
);

export default Home;
