import { connect } from 'react-redux'
import Import from '../components/Import'
import { fetchMakes, removeMakes } from '../redux/actions'

const mapStateToProps = (state) => {
    return{
        makes : state.makes,
        cars: state.cars
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMakes: () => dispatch(fetchMakes()),
        removeMakes: (id) => dispatch(removeMakes(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Import)
