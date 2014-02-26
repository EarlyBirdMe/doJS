/*publish time:2011-10-18 11:44:09*/
SNS("SNS.util.Storage", function (C, B) {
    var G = B.DOM, E, F = "", A = "sns";
    E = {getItem: function (D) {
        return this._operateItem(D, "get")
    }, setItem: function (D, H) {
        return this._operateItem(D, "set", H)
    }, removeItem: function (D) {
        return this._operateItem(D, "remove")
    }, _operateItem: function (H, J, M) {
        var K = this, D, L;
        if ("object" == typeof localStorage) {
            D = localStorage
        } else {
            if ("object" == typeof globalStorage) {
                D = globalStorage(location.host)
            }
        }
        if (D) {
            L = K._strToObj(D.getItem(A));
            if ("get" === J) {
                return L[H]
            } else {
                L[H] = M;
                return D[J + "Item"](A, K._objToStr(L))
            }
        } else {
            var I = G.get("#J_StorageUserData");
            if (!I) {
                I = G.create("<input>", {id: "J_StorageUserData", type: "hidden", style: "behavior:url(#default#userData)"});
                document.body.appendChild(I)
            }
            if ("set" === J) {
                try {
                    I[J + "Attribute"](H, M);
                    I.save(A)
                } catch (N) {
                }
            } else {
                try {
                    I.load(A);
                    L = I[J + "Attribute"](H);
                    if ("remove" !== J) {
                        return L
                    }
                    I.save(A)
                } catch (N) {
                    return""
                }
            }
        }
    }, _objToStr: function (H) {
        var I = F, D;
        for (D in H) {
            I += "," + D + ":" + H[D]
        }
        return I.substr(1)
    }, _strToObj: function (D) {
        return D ? B.JSON.parse('{"' + D.replace(/(:|,)/g, '"$1"') + '"}') : {}
    }};
    return C.util.Storage = E
});