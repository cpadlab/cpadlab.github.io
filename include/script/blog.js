$(document).ready(function() {

    function createBlogPost(title, link, pubDate, description, labels) {

        var blogContainer = $('<div>', { class: 'bcb-blog' });
        var blogRight = $('<div>', { class: 'bcb-blog-right' });
    
        var dateSpan = $('<span>', { class: 'bcb-date' }).text(new Date(pubDate).toDateString());
        blogRight.append(dateSpan);
        
        var titleElement = $('<h1>').text(title);
        blogRight.append(titleElement);
        
        var paragraph = $('<p>').html(description + ' <a href="' + link + '" target="_blank">Read More...</a>');
        blogRight.append(paragraph);
        
        var labelsContainer = $('<div>', { class: 'bcb-labels' });
        labels.forEach(function(label) {
            var labelDiv = $('<div>', { class: 'bcb-label' });
            var innerDiv = $('<div>');
            var span = $('<span>').text(label);
            labelDiv.append(innerDiv).append(span);
            labelsContainer.append(labelDiv);
        });
        
        blogRight.append(labelsContainer);
        blogContainer.append(blogRight);
    
        $('.bc-blogs').append(blogContainer);
    }
    
    $.ajax({
        url: '/include/blog.xml',
        type: 'GET',
        dataType: 'xml',
        success: function(data) {
            $(data).find('item').each(function() {
                var title = $(this).find('title').text();
                var link = $(this).find('link').text();
                var pubDate = $(this).find('pubDate').text();
                var description = $(this).find('description').text();
                var labels = [];

                $(this).find('labels label').each(function() {labels.push($(this).text());});
                createBlogPost(title, link, pubDate, description, labels);

            });
        }, error: function(error) {console.error('Error fetching XML:', error);}
    });
});