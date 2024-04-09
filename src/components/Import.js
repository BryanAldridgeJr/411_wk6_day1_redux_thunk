import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    MenuItem,
    Menu
} from '@mui/material'
import { useDispatch } from 'react-redux';
import { fetchMakes, removeMakes } from '../redux/actions';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './import.css'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    border: 'none',
    textDecoration: 'none',
    boxShadow: 'none',
    paddingLeft: '12%',
    textAlign: 'left', 
  }));


const Import = (props) => {
    const [imported, setImported] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [itemToDelete, setItemToDelete] =React.useState(null)

    const handleClickImport = () => {
        props.fetchMakes();
        setImported(true);
    };

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget)
        setItemToDelete(id)
    }

    const dispatch = useDispatch();


    const handleDelete = () => {
        if (itemToDelete) { 
            dispatch(removeMakes(itemToDelete));
            setAnchorEl(null); 
            setItemToDelete(null);
        }
    };
    
    const handleClickMoreVert = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    return (       
        <Container maxWidth="lg" className="car-container">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={10}>
                        <Item><button 
                                    onClick={handleClickImport} 
                                    style={{
                                        backgroundColor: '#3077d4',
                                        border: 'none',
                                        borderRadius: '9%',
                                        color: 'white',
                                        padding: '10px 22px',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Import
                             </button>
                        </Item>
                    </Grid>
                    <Grid item xs={10}>
                        <Item>
                            <h1 style={{ color: 'black' }}>
                                Count: {props.makes.length}
                            </h1>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            {imported && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Make/Model</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.makes.map((car, idx) => (
                            <TableRow key={car.MakeId}>
                                <TableCell>{car.MakeId}</TableCell>
                                <TableCell>{car.MakeName}</TableCell>
                                <TableCell>
                                        <MoreVertIcon /*onClick={handleClickMoreVert}*/onClick={(event) => handleClick(event, car.MakeId)} style={{ color: 'black'}} className="icon text-red" />
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleCloseMenu}
                                            className="custom-menu"
                                        >
                                            <MenuItem key={idx} selected={ car === 'Delete' } /*onClick={() => handleDelete(car.makeId)}*/onClick={handleDelete}>
                                                Delete
                                            </MenuItem>
                                        </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Container>
    );
}

export default Import;





