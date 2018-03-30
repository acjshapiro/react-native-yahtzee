import React from 'react';
import ScoreSection from './ScoreSection';
import { Grid, Col } from 'react-native-easy-grid';

const ScoreCard = () => (
  <Grid>
    <Col>
      <ScoreSection label="Upper" />
    </Col>
    <Col>
      <ScoreSection label="Lower" />
    </Col>
  </Grid>
)

export default ScoreCard;