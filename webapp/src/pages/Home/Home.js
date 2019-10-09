/* -- libs -- */
import React from 'react';

/* -- components -- */
import Posts from '../../components/Posts/Posts.js';

/* -- mui -- */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

/* -- styles -- */
import './Home.scss';

const Home = props => (
  <div className="home-page">
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8} md={6} className="left-grid">
          <Posts />
        </Grid>
        <Hidden only="xs">
          <Grid item sm={4} className="right-grid">
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
