
A2 = SteenrodAlgebra(profile=(3,2,1))

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




pairs = reduce(lambda x,y: x+y, [[[i,j] for j in range(8)] for i in range(8)])

#pairs == [[i,j] for i in range(8) for j in range(8)]  # True

displayBasis = [filter(lambda x: n == (LH[x[0]].degree() + RH[x[1]].degree()), pairs)
                 for n in range(24)]

displayVS = [VectorSpace(GF(2),len(x)) for x in displayBasis]

A2VS = displayVS

#  vec, below, returns vectors in the standard VS, not in A2[n],
#  so we use A2VS in place of A2:  A2VS[n] is the standard v.s.
#  whose dimension equals that of A2[n].  This happens to be the
#  same as displayVS[n], but we want to think of it differently,
#  so we give it a different name.

def vec(x):
    n = x.degree()
    return reduce(lambda x,y: x+y, \
            [A2[n].basis()[s].to_vector() for s in x.support()])

#  Note that to_vector() creates a vector in the standard VS, 
#  so this is what vec returns.

trans = [Hom(displayVS[n],A2VS[n])(
           [vec(LH[x[0]]*RH[x[1]]) for x in displayBasis[n]])
                 for n in range(24)]

transback = [x**(-1) for x in trans]

Sq1 = [[[] for i in range(8)] for j in range(8)]

for i in range(8):
    for j in range(8):
        n = LH[i].degree()+RH[j].degree()
	x = Sq(1)*LH[i]*RH[j]
	if x != 0:
	    w = transback[1+n](vec(x))
	    Sq1[i][j] = [displayBasis[1+n][s] for s in w.support()]



Sq2 = [[[] for i in range(8)] for j in range(8)]

for i in range(8):
    for j in range(8):
        n = LH[i].degree()+RH[j].degree()
	x = Sq(2)*LH[i]*RH[j]
	if x != 0:
	    w = transback[2+n](vec(x))
	    Sq2[i][j] = [displayBasis[2+n][s] for s in w.support()]


Sq4 = [[[] for i in range(8)] for j in range(8)]

for i in range(8):
    for j in range(8):
        n = LH[i].degree()+RH[j].degree()
	x = Sq(4)*LH[i]*RH[j]
	if x != 0:
	    w = transback[4+n](vec(x))
	    Sq4[i][j] = [displayBasis[4+n][s] for s in w.support()]


aOfOneOffset = [[0,0], 
		[8,4], 
		[12,6], 
		[14,7],
		[20,10],
		[22,11],
		[26,13],
		[34,17]]

def print_sqi_for_js():
      """
      Function to output Sq^i data as dict for js functions
      """
      operationData = {}
      for n in [1,2,4]:
            operationData['sq'+str(n)] = {}
            for i in range(8):
                  for j in range(8):
                        dot_id = "{0}-{1}".format(aOfOneOffset[i][0],j)
                        operationData['sq'+str(n)][dot_id] = []
                        x = Sq(n)*LH[i]*RH[j]
                        if x != 0:
                              deg = LH[i].degree()+RH[j].degree()
                              w = transback[n+deg](vec(x))
                              operationData['sq'+str(n)][dot_id] = ["{0}-{1}".format(aOfOneOffset[i][0],j) for i,j in [displayBasis[n+deg][s] for s in w.support()]]
                        else:
                              operationData['sq'+str(n)][dot_id] = [0]
      return operationData
