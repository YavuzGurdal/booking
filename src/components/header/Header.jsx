import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './header.css'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css files
import { useState } from "react";
import { format } from 'date-fns'
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => { // type'i List.jsx den gonderdim. list componenti aciksa Header'da olacak degisikllikleri bu sekilde yaptim
    const [destination, setDestination] = useState('')
    const [opendate, setOpendate] = useState(false) // takvimi acip kapatmak icin yazildi.

    const [date, setDate] = useState([ // react-date-range'den hazir geliyor
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openOptions, setOpenOptions] = useState(false) // optionsi acip kapatmak icin yazildi.
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    const navigate = useNavigate()

    // 1.parametre name 2.parametre yapilacak islem.burda azaltma veya artirma
    // ...prev ile state'in icindekileri aliyoruz
    // parametre olarak gelen name ile islem yapiyoruz. 
    // js object islemleri
    // options[name] ile name yerine adult gelirse adult degerine ulasabiliyorum. bu javascript'ten geliyor
    const handleOption = (name, operation) => {
        setOptions((prev) => { // prev islemden onceki state
            return {
                ...prev,
                [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    // search'e basinca /hotels'e gidiyor ve state olarak {destination, date, options} degerlerini gonderiyoruz
    // state'i useLocation() kullanarak alacagim. (useLocation kullanarak baska verilerede ulasabilirim)
    const handleSearch = () => {
        navigate('/hotels', { state: { destination, date, options } })
    }

    return (
        <div className='header'>
            <div className={type === 'list' ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                {type !== 'list' &&
                    <>
                        <h1 className="headerTitle">
                            A lifetime of discounts? It's Genius.
                        </h1>
                        <p className="headerDesc">
                            Get rewarded for your travels – unlock instant savings of 10% or more with a free Yvzbooking account
                        </p>
                        <button className="headerBtn">Sign in / Register</button>
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                                <input
                                    type="text" className="headerSearchInput" placeholder="Where are you going?"
                                    onChange={e => setDestination(e.target.value)}
                                />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                                <span onClick={() => setOpendate(!opendate)} className="headerSearchText">
                                    {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
                                </span>
                                { // takvimin acilip kapanmasi icin
                                    opendate &&
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={item => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        className='date'
                                        minDate={new Date()}
                                    />
                                }
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                                {
                                    openOptions &&
                                    <div className="options">
                                        <div className="optionItem">
                                            <span className="optionText">Adult</span>
                                            <div className="optionCounter">
                                                <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                                                <span className="optionCounterNumber">{options.adult}</span>
                                                <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Children</span>
                                            <div className="optionCounter">
                                                <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                                                <span className="optionCounterNumber">{options.children}</span>
                                                <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Room</span>
                                            <div className="optionCounter">
                                                <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                                                <span className="optionCounterNumber">{options.room}</span>
                                                <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="headerSearchItem">
                                <button onClick={handleSearch} className="headerBtn">Search</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header