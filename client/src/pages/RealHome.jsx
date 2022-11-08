import React from 'react'
import Sidebar from '../components/Sidebar'

const RealHome = () => {
    return (
        <>
            <Sidebar />
            <div id="intro-example" class="p-5 text-center bg-image"
                style={{ backgroundColor: "black", height:"100vh"}}>
                <div class="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.7);" }}>
                    <div class="d-flex justify-content-center align-items-center h-100">
                        <div class="text-white">
                            <h1 class="mb-3">TODO LIST APP</h1>
                            <h5 class="mb-4">
                                BE MORE PRODUCTIVE WITH IMPACT
                            </h5>
                            <a class="btn btn-outline-light btn-lg m-2" href="/app"
                                role="button" rel="nofollow">INBOX</a>
                            <a class="btn btn-outline-light btn-lg m-2" href="/"
                                role="button">HOME</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RealHome