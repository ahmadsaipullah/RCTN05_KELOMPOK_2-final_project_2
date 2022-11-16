import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import { useCart } from 'react-use-cart'

export const CardButtons = ({ product, state, handleAlert }) => {
    const { addItem } = useCart()
    const navigate = useNavigate()

    const handleClick = () => {
        state.isLoginSuccess ? addItem(product) : navigate("/login")
        handleAlert()
    }

    const handleRedirect = () => {
        navigate(`/details/${product.id}`)
    }

    return (
        <>
            <Button variant="primary mr-2" onClick={() => handleRedirect()}>
                Detail
            </Button>
            {state.user.role !== "admin" &&
                <Button
                    variant="success"
                    onClick={() => handleClick()}
                >
                    Add To Cart
                </Button>
            }
        </>
    )
}
