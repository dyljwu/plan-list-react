
import React, { useEffect, useState } from 'react'
import axios from 'axios';


function getRows(planList) {
  console.log(planList)
  return planList.map(({ id, label }) => <li>{`Id: ${id} Label: ${label}`}</li>);
}

function PlanList() {

  const [{plans: planList, numPlans}, setPlans] = useState({ plans: [], numPlans: 0 });

  const getPlans = async () => {
    const response =  await axios.get('http://localhost:3050/plans');
    console.log(response);
    const { data } = response;
    const { result } = data;
    const { plans: _plans } = result;

    const planNames = _plans.map(({label, id}) => ({id, label}));

    setPlans({plans: planNames, numPlans: planNames.length});
  }

  useEffect(() => {
    getPlans();
  }, []);

  return (
        <ol>
          {getRows(planList)}
        </ol>
  )
}

export default PlanList;
