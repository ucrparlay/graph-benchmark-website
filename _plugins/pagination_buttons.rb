require 'jekyll'

module Jekyll
    module PaginationButtons
        def pagination_buttons(paginator, url)
            if paginator["total_pages"] < 2
                return []
            end
            buttons = Array.new(paginator["total_pages"] + 2) {|count| { "title" => count, "href" => "#{url}page#{count}", "active" => count == paginator["page"] }}
            buttons[1]["href"] = url
            if paginator["page"] + 2 < paginator["total_pages"]
                buttons.slice!(paginator["page"] + 2 .. paginator["total_pages"] - 1)
                buttons.insert(paginator["page"] + 2, { "title" => "...", "disabled" => true })
            end
            if paginator["page"] > 3
                buttons.slice!(2 .. paginator["page"] - 2)
                buttons.insert(2, { "title" => "...", "disabled" => true })
            end
            buttons[0] = { "title" => "&lsaquo;" }
            buttons[-1] = { "title" => "&rsaquo;" }
            if paginator["page"] > 2
                buttons[0]["href"] = "#{url}page#{paginator["page"]-1}"
            elsif paginator["page"] == 2
                buttons[0]["href"] = url
            else
                buttons[0]["disabled"] = true
            end
            if paginator["page"] < paginator["total_pages"]
                buttons[-1]["href"] = "#{url}page#{paginator["page"]+1}"
            else
                buttons[-1]["disabled"] = true
            end
            return buttons
        end
    end
end

Liquid::Template.register_filter(Jekyll::PaginationButtons)
