var search = new searches();
var typingTimer;
var running = false;
$('#com').prop('checked', true);
$('#input').on('keyup', function (e) {
    clearInterval(typingTimer);
    typingTimer = setTimeout(start, 600);
});
$('#search').on('click', function () {
    view.start();
    start();
});
$('input[type=checkbox]').on('click', function () {
    var id = $(this).attr('id');
    if (id === 'net' || id === 'com' || id === 'biz' || id === 'info') {
        if ($('#' + id).prop('checked')) {
            search.addTLD('.' + id);
            start();
        } else {
            search.removeTLD('.' + id);
            search.remove('.' + id);
        }
    }
});
$('#checkout').submit(function () {
    var data = [];
    var available = search.getAvailable();
    for (var i = 0; i < available.length; i++) {
        if ($('#' + available[i].replace('.', '\\.')).prop('checked')) {
            data.push(available[i]);
        }
    }
    //PHP will receive $_POST["data"]
    $('#checked').val(JSON.stringify(data));
    return true;
});
$('#help').on('click', function () {
    $('#instruction').slideToggle();
});
function searches() {
    var site = Backbone.Model.extend({
        defaults: {
            available: false,
            searched: false
        },
        setAvailable: function () {
            this.set({available: true});
        },
        searched: function () {
            this.set({searched: true});
        }
    });
    var siteCollection = Backbone.Collection.extend({
        model: site
    });
    var matrix = [[]];
    var tlds = ['.com'];
    var sites = new siteCollection();
    var newVisit = new siteCollection();
    var reset = false;
    var prevLength;

    return{
        getInput: function () {
            var updateMatrix = [[]];
            var input = $('#input').val();
            rows = (input.split('\n')).filter(Boolean);
            if (rows.length < matrix.length) {
                search.remove(matrix.pop());
            }
            for (var i = 0; i < rows.length; i++) {
                collums = rows[i].split(',');
                updateMatrix[i] = collums;
            }
            for (var i = 0; i < updateMatrix.length; i++) {
                for (var j = 0; j <= updateMatrix[i].length; j++) {
                    try {
                        if (matrix[i][j] !== updateMatrix[i][j]) {
                            var temp = matrix[i][j];
                            matrix[i][j] = updateMatrix[i][j];
                            matrix[i] = matrix[i].filter(Boolean);
                            search.remove(temp);
                        }
                    } catch (err) {
                        matrix[i] = updateMatrix[i];
                    }
                }
            }
        },
        setSearch: function () {
            if (matrix.length === 1) {
                search.reset();
                reset = true;
                for (var i = 0; i < matrix[0].length; i++) {
                    for (var j = 0; j < tlds.length; j++) {
                        var final = matrix[0][i].replace(/ /g, '') + tlds[j];
                        if (!sites.get(final)) {
                            sites.add({'id': final});
                        }
                    }
                }
            } else {
                if (reset) {
                    for (var i = 0; i < matrix[0].length; i++) {
                        for (var j = 0; j < tlds.length; j++) {
                            search.remove(matrix[0][i].replace(/ /g, '') + tlds[j]);
                        }
                    }
                    sites.reset();
                    reset = false;
                } else if (matrix.length !== prevLength) {
                    search.reset();
                }
                prevLength = matrix.length;
                tempSearch = [];
                var tempSearch = getCombinations(matrix);
                for (var i = 0; i < tlds.length; i++) {
                    for (var j = 0; j < tempSearch.length; j++) {
                        var final = tempSearch[j] + tlds[i];
                        if (!sites.get(final)) {
                            sites.add({'id': final});
                        }
                    }
                }
            }
            function getCombinations(array, prefix) {
                prefix = prefix || '';
                if (!array.length) {
                    return prefix;
                }

                var result = array[0].reduce(function (result, value) {
                    return result.concat(getCombinations(array.slice(1), prefix + value));
                }, []);
                return result;
            }}
        ,
        startSearching: function () {
            var i = 0;
            var searchMatrix = new siteCollection(sites.where({searched: false}));
            searchMatrix = searchMatrix.pluck('id');
            if (searchMatrix.length > 0) {
                interval = setInterval(checkSite, 550);
            } else {
                running = false;
            }
            function checkSite() {
                site = searchMatrix[i];
                $.post(('//test3rdparty.directnic.com/domain/search/?url=' + site), function (data) {
                    data=JSON.parse(data.substring(data.indexOf("{"),data.length));
                    if (data[site] === 1) {
                        sites.get(site).setAvailable();
                    }
                    sites.get(site).searched();
                    view.append(site, sites.get(site).get('available'));
                    if (searchMatrix.length === i + 1) {
                        running = false;
                        clearInterval(interval);
                        document.location.hash = 'search/' + btoa(JSON.stringify(sites));
                        var count = $("div[class*='col-md-3']").length;
                        if (sites.length !== count) {
                            setTimeout(view.remove, 1000);
                        }
                        i = 0;
                    }
                    i++;
                });
            }
        }
        ,
        remove: function (data) {
            var searchTotal = sites.pluck('id');
            for (var i = 0; i < searchTotal.length; i++) {
                if (searchTotal[i].indexOf(data) !== -1) {
                    for (var j = 0; j < 5; j++) {
                        view.adjust(searchTotal[i]);
                    }
                    sites.remove(searchTotal[i]);
                }
            }
        },
        reset: function (data) {
            var searchTotal = sites.pluck('id');
            for (var i = 0; i < searchTotal.length; i++) {
                for (var j = 0; j < 5; j++) {
                    view.adjust(searchTotal[i]);
                }
                sites.remove(searchTotal[i]);
            }
        },
        addTLD: function (data) {
            tlds.push(data);
        },
        removeTLD: function (data) {
            tlds.splice(tlds.indexOf(data), 1);
        },
        getAvailable: function () {
            if (sites.length !== 0) {
                var available = new siteCollection(sites.where({available: true}));
                available = available.pluck('id');
                return available;
            } else {
                var available = new siteCollection(newVisit.where({available: true}));
                available = available.pluck('id');
                return available;
            }

        },
        setData: function (data) {
            newVisit.reset();
            newVisit.add(JSON.parse(data));
        },
        results: function () {
            if (sites.length === 0) {
                if (newVisit.where({available: true}).length !== 0) {
                    view.start();
                    for (var i = 0; i < newVisit.length; i++) {
                        var temp = newVisit.models[i];
                        view.append(temp.get('id'), temp.get('available'));
                    }
                }
            }
        },
        set: function (data) {
            sites.get(data).setAvailable();
        },
        get: function () {
            return sites;
        }
    };
}
var appView = Backbone.View.extend({
    el: '#display',
    templateA: _.template('<div class="col-md-3" style="display:flex;align-items:center;padding-bottom:.5em;" id="<%= id %>">'
            + "<input type='checkbox' id='<%= message %>'><label for='<%= message %>'></label>&nbsp;<%= message %></div>"),
    templateB: _.template('<div class="col-md-3" style="display:flex;align-items:center;padding-bottom:.5em;" id="<%= id %>"><img src="img/notFound.png" height="25px" width="25px">'
            + '<font color="#a0a0a0">&nbsp;<%= message %></font>'),
    start: function () {
        $('#results').show();
        $('html,body').animate({scrollTop: $("#results").offset().top}, 'slow');
    },
    append: function (data, condition) {
        if (condition) {
            this.$el.append(this.templateA({message: data, id: data.replace('.', '')}));
        } else {
            this.$el.prepend(this.templateB({message: data, id: data.replace('.', '')}));
        }
    },
    adjust: function (id) {
        $('#' + id.replace('.', '')).remove();
    },
    remove: function () {
        $('[id]').each(function () {
            $('[id="' + this.id + '"]:gt(0)').remove();
        });
    }
});
var view = new appView();
var routes = Backbone.Router.extend({
    routes: {
        "terms": "terms",
        "privacy": "privacy",
        'search/:info': 'search',
        '': 'home'
    },
    terms: function () {
        $('#index').hide();
        $('#privacy').hide();
        $('#terms').show();
    },
    privacy: function () {
        $('#index').hide();
        $('#terms').hide();
        $('#privacy').show();
    },
    home: function () {
        $('#results').hide();
        $('#index').show();
        $('#terms').hide();
        $('#privacy').hide();
    },
    search: function (data) {
        $('#index').show();
        $('#terms').hide();
        $('#privacy').hide();
        search.setData(atob(data));
        search.results();
    }
});
var appRoutes = new routes();
Backbone.history.start();
function start() {
    if (!running) {
        running = true;
        search.getInput();
        search.setSearch();
        setTimeout(search.startSearching, 200);
    }

}
