# File: ArbolBusqueda.py
class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.izq = None
        self.der = None


class ArbolBusqueda:
    def __init__(self):
        self.raiz = None

    # ---------------- INSERTAR ----------------
    def insertar(self, dato):
        if self.raiz is None:
            self.raiz = Nodo(dato)
            return
        actual = self.raiz
        while True:
            if dato == actual.dato:
                return
            if dato < actual.dato:
                if actual.izq is None:
                    actual.izq = Nodo(dato)
                    return
                else:
                    actual = actual.izq
            if dato > actual.dato:
                if actual.der is None:
                    actual.der = Nodo(dato)
                    return
                else:
                    actual = actual.der

    # ---------------- BUSCAR ----------------
    def buscar(self, dato):
        actual = self.raiz
        while actual is not None:
            if dato == actual.dato:
                return actual
            if dato < actual.dato:
                actual = actual.izq
            else:
                actual = actual.der
        return None

    # ---------------- ELIMINAR ----------------
    def eliminar(self, dato):
        self.raiz = self._eliminar(self.raiz, dato)

    def _eliminar(self, nodo, dato):
        if nodo is None:
            return None

        if dato < nodo.dato:
            nodo.izq = self._eliminar(nodo.izq, dato)
        elif dato > nodo.dato:
            nodo.der = self._eliminar(nodo.der, dato)
        else:
            # CASO 1: nodo hoja (sin hijos)
            if nodo.izq is None and nodo.der is None:
                return None

            # CASO 2: un solo hijo
            # solo hijo derecho
            if nodo.izq is None:
                return nodo.der
            # solo hijo izquierdo
            if nodo.der is None:
                return nodo.izq

            # CASO 3: dos hijos
            # se reemplaza por el menor del subarbol derecho (sucesor inorden)
            sucesor = self._minimo(nodo.der)
            nodo.dato = sucesor.dato
            nodo.der = self._eliminar(nodo.der, sucesor.dato)

        return nodo

    def _minimo(self, nodo):
        actual = nodo
        while actual.izq is not None:
            actual = actual.izq
        return actual

    # ---------------- RECORRIDOS ----------------
    def inorden(self, nodo=None, primero=True):
        if primero:
            nodo = self.raiz
        if nodo is not None:
            self.inorden(nodo.izq, False)
            print(nodo.dato, end=" ")
            self.inorden(nodo.der, False)


if __name__ == "__main__":
    NuevoArbol = ArbolBusqueda()
    for v in (50, 20, 60, 30, 70, 45, 15):
        NuevoArbol.insertar(v)

    print("Arbol original:")
    NuevoArbol.inorden()
    print()

    print("\nCaso 1 - eliminar hoja (15):")
    NuevoArbol.eliminar(15)
    NuevoArbol.inorden()
    print()

    print("\nCaso 2 - eliminar un solo hijo (30, tiene solo hijo derecho 45):")
    NuevoArbol.eliminar(30)
    NuevoArbol.inorden()
    print()

    print("\nCaso 3 - eliminar dos hijos (20):")
    NuevoArbol.eliminar(20)
    NuevoArbol.inorden()
    print()

    print("\nCaso 3 - eliminar dos hijos en la raiz (50):")
    NuevoArbol.eliminar(50)
    NuevoArbol.inorden()
    print()

    print("\nDato inexistente (99) no debe romper nada:")
    NuevoArbol.eliminar(99)
    NuevoArbol.inorden()
    print()
