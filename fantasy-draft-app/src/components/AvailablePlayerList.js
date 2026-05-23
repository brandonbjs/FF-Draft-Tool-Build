import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'

const AvailablePlayerList = ({
    pickingId,
    teams,
    draftStarted,
    roundNum,
    updatePickingId,
    resetCountdown,
}) => {
    // hooks
    const [players, setPlayers] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL || ''}/fetchPlayers`)
            .then((res) => res.json())
            .then((data) => {
                const playersData = data.map((player) => ({
                    player_id: player.player_id,
                    adp: player.adp,
                    name: player.name,
                    position: player.position,
                    team: player.team,
                    bye: player.bye,
                }))
                setPlayers(playersData)
            })
    }, [])

    // responsible for handling when the user clicks the "Add Player" button
    const handleAddPlayerToTeam = (player) => {
        // Don't allow the user to add players to a team without the draft timer commencing
        if (!draftStarted) {
            return
        }

        // check to make sure the current picking team has slots available for that position
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i]

            if (team.id === pickingId) {
                // check if the player position being added is full or not
                const draftedPlayer = { ...player, draftedRound: roundNum }

                // check QB first, place the player in flex spots if the QB spot is full
                if (player.position === 'QB') {
                    if (team.players.QB === null) {
                        team.players.QB = draftedPlayer
                    } else {
                        if (team.players.FLEX1 === null) {
                            team.players.FLEX1 = draftedPlayer
                        } else {
                            if (team.players.FLEX2 === null) {
                                team.players.FLEX2 = draftedPlayer
                            } else {
                                alert(
                                    'The position you are trying to fill is full.'
                                )
                                return
                            }
                        }
                    }
                } else if (player.position === 'TE') {
                    // Check if TE slot is full, if so, check flex spots
                    if (team.players.TE === null) {
                        team.players.TE = draftedPlayer
                    } else {
                        if (team.players.FLEX1 === null) {
                            team.players.FLEX1 = draftedPlayer
                        } else {
                            if (team.players.FLEX2 === null) {
                                team.players.FLEX2 = draftedPlayer
                            } else {
                                alert(
                                    'The position you are trying to fill is full.'
                                )
                                return
                            }
                        }
                    }
                } else if (player.position === 'DEF') {
                    // Check if DST slot is full, if so, check flex spots
                    if (team.players.DST === null) {
                        team.players.DST = draftedPlayer
                    } else {
                        if (team.players.FLEX1 === null) {
                            team.players.FLEX1 = draftedPlayer
                        } else {
                            if (team.players.FLEX2 === null) {
                                team.players.FLEX2 = draftedPlayer
                            } else {
                                alert(
                                    'The position you are trying to fill is full.'
                                )
                                return
                            }
                        }
                    }
                } else if (player.position === 'PK') {
                    // Check if K slot is full, if so, check flex spots
                    if (team.players.K === null) {
                        team.players.K = draftedPlayer
                    } else {
                        if (team.players.FLEX1 === null) {
                            team.players.FLEX1 = draftedPlayer
                        } else {
                            if (team.players.FLEX2 === null) {
                                team.players.FLEX2 = draftedPlayer
                            } else {
                                alert(
                                    'The position you are trying to fill is full.'
                                )
                                return
                            }
                        }
                    }
                } else if (player.position === 'RB') {
                    // Check if RB slots are full, if so, check flex spots
                    if (team.players.RB1 === null) {
                        team.players.RB1 = draftedPlayer
                    } else if (team.players.RB1 != null) {
                        if (team.players.RB2 === null) {
                            team.players.RB2 = draftedPlayer
                        } else {
                            // check flex spots
                            if (team.players.FLEX1 === null) {
                                team.players.FLEX1 = draftedPlayer
                            } else {
                                if (team.players.FLEX2 === null) {
                                    team.players.FLEX2 = draftedPlayer
                                } else {
                                    alert(
                                        'The position you are trying to fill is full.'
                                    )
                                    return
                                }
                            }
                        }
                    }
                } else if (player.position === 'WR') {
                    // Check if WR slots are full, if so, check flex spots
                    if (team.players.WR1 === null) {
                        team.players.WR1 = draftedPlayer
                    } else if (team.players.WR1 != null) {
                        if (team.players.WR2 === null) {
                            team.players.WR2 = draftedPlayer
                        } else {
                            // check flex spots
                            if (team.players.FLEX1 === null) {
                                team.players.FLEX1 = draftedPlayer
                            } else {
                                if (team.players.FLEX2 === null) {
                                    team.players.FLEX2 = draftedPlayer
                                } else {
                                    alert(
                                        'The position you are trying to fill is full.'
                                    )
                                    return
                                }
                            }
                        }
                    }
                }

                setPlayers((prev) =>
                    prev.filter((p) => p.player_id !== player.player_id)
                )
                resetCountdown(60)
                updatePickingId()
            }
        }
    }

    // define columns to be used by react-data-table-component
    // includes a custom cell that has our "Add Player" button!
    const columns = [
        {
            name: 'ADP',
            selector: (row) => row.adp,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Position',
            selector: (row) => row.position,
            sortable: true,
        },
        {
            name: 'Team',
            selector: (row) => row.team,
            sortable: true,
        },
        {
            name: 'Bye',
            selector: (row) => row.bye,
            sortable: true,
        },
        {
            name: 'Add to Team',
            cell: (row) => (
                <button
                    onClick={() => handleAddPlayerToTeam(row)}
                >
                    Add Player
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ]

    // this function uses MongoDB's filter() function to implement our search bar
    const filteredPlayers = players.filter((player) => {
        const searchTextLowerCase = searchText.toLowerCase()
        // Can come back and add more fields to search through later
        const fieldsToSearch = ['name', 'team', 'position']

        // Check if any of the fields match the search text
        return fieldsToSearch.some((field) =>
            player[field].toLowerCase().includes(searchTextLowerCase)
        )
    })

    // invoke the DataTable custom tag we imported at the top of this component
    // and pass the appropriate data to it. Also include the table
    // options such as pagination, highligh on hover, striping and theme.
    return (
        <div className="avail-player-grid-container">
            <div className="search-bar">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search by name, position, team..."
                />
            </div>
            <DataTable
                columns={columns}
                data={filteredPlayers}
                pagination
                paginationPerPage={15}
                paginationRowsPerPageOptions={[15, 25, 50]}
                highlightOnHover
                responsive
                striped
                theme="dark"
            />
        </div>
    )
}

export default AvailablePlayerList
