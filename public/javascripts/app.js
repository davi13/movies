var React = require("react");
var Movie = require("./movie");
var { Container, Row, Col, Card, Button, Nav, NavItem, NavLink,Popover, PopoverHeader, PopoverBody  } = require('reactstrap');

class App extends React.Component {

  constructor() {
    super();
    this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
    this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
    this.handleClickParent = this.handleClickParent.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = { viewOnlyLike : false, movies:[], mymovies:[], listName:[], totalLike:0, popoverOpen: false}
  }

  toggle() {
      this.setState({
         popoverOpen: !this.state.popoverOpen
      });
  }

  componentDidMount() {
    var ctx = this;
    fetch('./movies')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
      console.log(data);
        ctx.setState(
          {movies : data}
        );
    }).catch(function(error) {
        console.log('Request failed', error)
    });

    fetch('./mymovies')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
      console.log(data);
        var copyListName = data.map( movie => movie.title+"," );
        ctx.setState(
          {
            mymovies : data,
            totalLike: data.length,
            listName: copyListName
          }
        );
    }).catch(function(error) {
        console.log('Request failed', error)
    });
  }

  handleClickLikeOn() {
    this.setState({
      viewOnlyLike : true
    })
  }

  handleClickLikeOff() {
    this.setState({
      viewOnlyLike : false
    })
  }

  handleClickParent(name, isLike) {
    var copyListName = this.state.listName.concat();
    if(isLike == true){
      copyListName.push(name + ", ");
      this.setState({
          totalLike : this.state.totalLike+1,
          listName: copyListName
      })
    } else {
      this.setState({
          totalLike : this.state.totalLike-1
      })
    }
  }



  render() {
    var cardList = [];

    for(var i=0; i<this.state.movies.length; i++){
       var isLike = false;
       for(var y=0; y<this.state.mymovies.length; y++){
         if(this.state.movies[i].id == this.state.mymovies[y].idMovieDB) {
            isLike = true;
            break;
         }
       }

      cardList.push(
        <Movie handleClickParent={this.handleClickParent} isLike={isLike} viewOnlyLike={this.state.viewOnlyLike} idMovieDB={this.state.movies[i].id} poster_path={this.state.movies[i].poster_path} title={this.state.movies[i].title} overview={this.state.movies[i].overview.substr(0, 100)+'...'} />
      );
    }

    console.log(this.state.mymovies);
    //console.log(this.state.listName.slice(0,1,2));
    
   //var newCopyListName = this.state.listName.slice(Math.max(this.state.listName.length - 3, 1));
   //this.state.listName.slice((this.state.listName.length - 5), this.state.listName.length)
   



    return (
      <Container>
        <Row>
          <Col>
            <Nav>
              <NavItem>
                <NavLink href="#"><img src="./images/logo.png" /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.handleClickLikeOff}>Last releases</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.handleClickLikeOn}>My movies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <Button onClick={this.toggle} id="countMovies" color="secondary">{this.state.totalLike} films</Button>
                  <Popover placement="bottom" isOpen={this.state.popoverOpen} target="countMovies" toggle={this.toggle}>
                    <PopoverHeader>Les 3 dénières séléctions:</PopoverHeader>
                    <PopoverBody>{this.state.listName.slice(this.state.listName.length -3)}...</PopoverBody>
                  </Popover>
                </NavLink>
              </NavItem>
            </Nav>


          </Col>

        </Row>
        <Row>

          {cardList}

        </Row>
      </Container>
    )
  }
}

module.exports = App;
