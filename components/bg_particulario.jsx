import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const BgParticulario = ({BgImage="url(/fondo1.jpg)" , color = "#fff"}) => {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
    }, []);

    return (
        <Particles
            className="h-full"
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "area": 800
                        }
                    },
                    "color": {
                        "value": "#000"
                    },
                    "shape": {
                        "type": "circle"
                    },
                    "opacity": {
                        "value": 1
                    },
                    "size": {
                        "value": {
                            "min": 1,
                            "max": 30
                        }
                    },
                    "links": {
                        "enable": true,
                        "distance": 150,
                        "color": "#000",
                        "opacity": 1,
                        "width": 2
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "outModes": "out"
                    }
                },
                "interactivity": {
                    "detectsOn": "canvas",
                    "events": {
                        "onHover": {
                            "enable": false,
                            "mode": "bubble"
                        },
                        "onClick": {
                            "enable": false,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "links": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 200,
                            "size": 150,
                            "duration": 2,
                            "opacity": 1
                        },
                        "repulse": {
                            "distance": 200
                        },
                        "push": {
                            "quantity": 4
                        },
                        "remove": {
                            "quantity": 2
                        }
                    }
                },
                "backgroundMask": {
                    "enable": true,
                    "cover": {
                        "value": {
                            "r": 1,
                            "g": 1,
                            "b": 1
                        }
                    }
                },
                "fullScreen": {
                    "enable": false,
                    "zIndex": -1
                  },
                "detectRetina": true,
                "fpsLimit": 60,
                "background": {
                    "color": "#ffffff",
                    "image": BgImage,
                    "position": "50% 50%",
                    "repeat": "no-repeat",
                    "size": "cover"
                }
            }
            }
        />)
};

export default BgParticulario;