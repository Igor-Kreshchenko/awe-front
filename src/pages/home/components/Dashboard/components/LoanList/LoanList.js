import { Box } from '@material-ui/core';
import './LoanList.scss';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { LoanListItem } from './LoanListItem/LoanListItem';
import { connect } from 'react-redux';
import { payLoanAction } from '../../../CardsSidebar/cardsSidebar-slice';

export const LoanListComponent = ({ currency, list, updateLoan }) => {
    const { t } = useTranslation();
    if (list.length == 0) {
      return <></>
    }
    const loans = list.map(loan => <LoanListItem key={ loan.ID } loan={ loan } currency={ currency } payLoan={ updateLoan } />)

    return (
      <Box className="loan">
        <h3 className="loan-header">{ t('loan.Title') }:</h3>
        { loans }
      </Box>
    )
}

LoanListComponent.propTypes = {
  currency: PropTypes.string,
  list: PropTypes.array,
  updateLoan: PropTypes.func
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
updateLoan: (data) => dispatch(payLoanAction(data))
});

export const LoanList = connect(mapStateToProps, mapDispatchToProps)(LoanListComponent)