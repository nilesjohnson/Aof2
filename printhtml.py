
LH = [
       Sq(0),
       Sq(4),
       Sq(2)*Sq(4),
       Sq(1)*Sq(2)*Sq(4),
       Sq(4)*Sq(2)*Sq(4),
       Sq(5)*Sq(2)*Sq(4),
       Sq(2)*Sq(5)*Sq(2)*Sq(4),
       Sq(4)*Sq(2)*Sq(5)*Sq(2)*Sq(4)]

RH = [
      Sq(0),
      Sq(1),
      Sq(2),
      Sq(3),Sq(2)*Sq(1),
      Sq(2)*Sq(2),
      Sq(2)*Sq(1)*Sq(2),
      Sq(2)*Sq(2)*Sq(2)]

for j in range(8):
            x = LH[i]*RH[j]
            dgre = LH[i].degree()
            print "<p id=\"dot-",\
	        2*dgre,\
	        "-",\
	        j,\
	        "-adem\">\\("
	    tt = (x.change_basis('adem')).terms()
	    tt.reverse()
	    print tt[0]
	    for k in range(1,len(tt)):
	        print "+",tt[k]
	    print "\\) </p>"
            print "<p id=\"dot-",\
	        2*dgre,\
	        "-",\
	        j,\
	        "-milnor\">\\("
	    tt = x.terms()
	    tt.reverse()
	    print tt[0]
	    for k in range(1,len(tt)):
	        print "+",tt[k]
	    print "\\) </p>"

